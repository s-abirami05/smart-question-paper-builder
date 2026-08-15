import React, {
  useEffect,
  useRef,
  useState,
} from "react";

const CANVAS_WIDTH = 1100;
const CANVAS_HEIGHT = 650;

const SAVED_DIAGRAMS_KEY =
  "questionPaperBuilder_diagrams";

const COLORS = {
  blue: "#2563eb",
  green: "#16a34a",
  red: "#dc2626",
  orange: "#ea580c",
  purple: "#7c3aed",
  gray: "#475569",
  dark: "#0f172a",
};

function createId() {
  return `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 9)}`;
}

function getDistance(
  x1,
  y1,
  x2,
  y2
) {
  return Math.sqrt(
    (x2 - x1) ** 2 +
      (y2 - y1) ** 2
  );
}

function getCenter(shape) {
  if (
    shape.type === "circle" ||
    shape.type === "ellipse"
  ) {
    return {
      x: shape.x,
      y: shape.y,
    };
  }

  if (
    shape.type === "line" ||
    shape.type === "arrow"
  ) {
    return {
      x: (shape.x + shape.x2) / 2,
      y: (shape.y + shape.y2) / 2,
    };
  }

  if (shape.type === "text") {
    return {
      x: shape.x,
      y: shape.y,
    };
  }

  return {
    x:
      shape.x +
      (shape.width || 0) / 2,

    y:
      shape.y +
      (shape.height || 0) / 2,
  };
}

function pointNearLine(
  px,
  py,
  x1,
  y1,
  x2,
  y2,
  tolerance = 10
) {
  const dx = x2 - x1;
  const dy = y2 - y1;

  const lengthSquared =
    dx * dx + dy * dy;

  if (lengthSquared === 0) {
    return (
      getDistance(
        px,
        py,
        x1,
        y1
      ) <= tolerance
    );
  }

  let t =
    ((px - x1) * dx +
      (py - y1) * dy) /
    lengthSquared;

  t = Math.max(
    0,
    Math.min(1, t)
  );

  const closestX =
    x1 + t * dx;

  const closestY =
    y1 + t * dy;

  return (
    getDistance(
      px,
      py,
      closestX,
      closestY
    ) <= tolerance
  );
}

function pointInShape(
  x,
  y,
  shape
) {
  if (shape.type === "circle") {
    const r =
      shape.radius || 40;

    return (
      getDistance(
        x,
        y,
        shape.x,
        shape.y
      ) <= r
    );
  }

  if (shape.type === "ellipse") {
    const rx =
      shape.radiusX || 70;

    const ry =
      shape.radiusY || 45;

    return (
      ((x - shape.x) ** 2) /
        rx ** 2 +
        ((y - shape.y) ** 2) /
          ry ** 2 <=
      1
    );
  }

  if (shape.type === "diamond") {
    const width =
      shape.width || 150;

    const height =
      shape.height || 80;

    const cx =
      shape.x + width / 2;

    const cy =
      shape.y + height / 2;

    return (
      Math.abs(x - cx) /
          (width / 2) +
        Math.abs(y - cy) /
          (height / 2) <=
      1
    );
  }

  if (
    shape.type === "rect" ||
    shape.type === "roundRect" ||
    shape.type === "image"
  ) {
    return (
      x >= shape.x &&
      x <=
        shape.x +
          shape.width &&
      y >= shape.y &&
      y <=
        shape.y +
          shape.height
    );
  }

  if (
    shape.type === "line" ||
    shape.type === "arrow"
  ) {
    return pointNearLine(
      x,
      y,
      shape.x,
      shape.y,
      shape.x2,
      shape.y2,
      10
    );
  }

  if (shape.type === "text") {
    const width =
      shape.textWidth || 120;

    const height = 40;

    return (
      x >=
        shape.x -
          width / 2 &&
      x <=
        shape.x +
          width / 2 &&
      y >=
        shape.y -
          height / 2 &&
      y <=
        shape.y +
          height / 2
    );
  }

  return false;
}

function drawArrowHead(
  ctx,
  x1,
  y1,
  x2,
  y2,
  color = "#2563eb"
) {
  const angle = Math.atan2(
    y2 - y1,
    x2 - x1
  );

  const size = 12;

  ctx.save();

  ctx.fillStyle = color;

  ctx.beginPath();

  ctx.moveTo(x2, y2);

  ctx.lineTo(
    x2 -
      size *
        Math.cos(
          angle - Math.PI / 6
        ),
    y2 -
      size *
        Math.sin(
          angle - Math.PI / 6
        )
  );

  ctx.lineTo(
    x2 -
      size *
        Math.cos(
          angle + Math.PI / 6
        ),
    y2 -
      size *
        Math.sin(
          angle + Math.PI / 6
        )
  );

  ctx.closePath();

  ctx.fill();

  ctx.restore();
}

export default function DiagramEditor({ onSave, initialData = null }) {
  const canvasRef =
    useRef(null);

  const [tool, setTool] =
    useState("select");

  const [shapes, setShapes] =
    useState([]);

  const [selectedId, setSelectedId] =
    useState(null);

  const [isDrawing, setIsDrawing] =
    useState(false);

  const [startPoint, setStartPoint] =
    useState(null);

  const [tempShape, setTempShape] =
    useState(null);

  const [connectStart, setConnectStart] =
    useState(null);

  const [textValue, setTextValue] =
    useState("");

  const [showTextBox, setShowTextBox] =
    useState(false);

  const [diagramName, setDiagramName] =
    useState("Untitled Diagram");

  const [history, setHistory] =
    useState([]);

  const interactionRef =
    useRef({
      mode: null,
      shapeId: null,
      startX: 0,
      startY: 0,
      offsetX: 0,
      offsetY: 0,
      originalShapes: null,
      moved: false,
    });

  const shapesRef =
    useRef(shapes);

  // Load an existing question-specific diagram when the editor is reopened.
  useEffect(() => {
    if (!initialData) return;

    const incomingShapes =
      Array.isArray(initialData.shapes)
        ? initialData.shapes
        : [];

    setDiagramName(
      initialData.name || "Untitled Diagram"
    );
    setHistory([]);
    setSelectedId(null);
    setConnectStart(null);
    setTempShape(null);
    setStartPoint(null);
    setIsDrawing(false);

    if (incomingShapes.length === 0) {
      setShapes([]);
      return;
    }

    const imageShapes =
      incomingShapes.filter(
        (shape) =>
          shape.type === "image" &&
          shape.imageSrc
      );

    if (imageShapes.length === 0) {
      setShapes(incomingShapes);
      return;
    }

    let cancelled = false;

    Promise.all(
      imageShapes.map(
        (shape) =>
          new Promise((resolve) => {
            const image = new Image();

            image.onload = () =>
              resolve({
                id: shape.id,
                imageElement: image,
              });

            image.onerror = () =>
              resolve({
                id: shape.id,
                imageElement: null,
              });

            image.src = shape.imageSrc;
          })
      )
    ).then((loadedImages) => {
      if (cancelled) return;

      const imageMap =
        new Map(
          loadedImages.map((item) => [
            item.id,
            item.imageElement,
          ])
        );

      setShapes(
        incomingShapes.map((shape) => ({
          ...shape,
          ...(shape.type === "image"
            ? {
                imageElement:
                  imageMap.get(shape.id) ||
                  null,
              }
            : {}),
        }))
      );
    });

    return () => {
      cancelled = true;
    };
  }, [initialData]);

  useEffect(() => {
    shapesRef.current = shapes;
  }, [shapes]);

  /*
   * ==========================================
   * HISTORY
   * ==========================================
   */

  const cleanShapes = (
    currentShapes
  ) => {
    return currentShapes.map(
      (shape) => {
        const copy = {
          ...shape,
        };

        delete copy.imageElement;

        return copy;
      }
    );
  };

  const saveHistory = (
    currentShapes
  ) => {
    setHistory((prev) => [
      ...prev.slice(-19),
      JSON.parse(
        JSON.stringify(
          cleanShapes(
            currentShapes
          )
        )
      ),
    ]);
  };

  const undo = () => {
    if (history.length === 0) {
      return;
    }

    const previous =
      history[
        history.length - 1
      ];

    setShapes(previous);

    setHistory((prev) =>
      prev.slice(0, -1)
    );

    setSelectedId(null);
  };

  /*
   * ==========================================
   * MOUSE POSITION
   * ==========================================
   */

  const getMousePosition = (e) => {
    const canvas =
      canvasRef.current;

    if (!canvas) {
      return {
        x: 0,
        y: 0,
      };
    }

    const rect =
      canvas.getBoundingClientRect();

    const scaleX =
      canvas.width /
      rect.width;

    const scaleY =
      canvas.height /
      rect.height;

    return {
      x:
        (e.clientX -
          rect.left) *
        scaleX,

      y:
        (e.clientY -
          rect.top) *
        scaleY,
    };
  };

  /*
   * ==========================================
   * FIND SHAPE
   * ==========================================
   */

  const findShapeAt = (
    x,
    y
  ) => {
    const currentShapes =
      shapesRef.current;

    for (
      let i =
        currentShapes.length - 1;
      i >= 0;
      i--
    ) {
      if (
        pointInShape(
          x,
          y,
          currentShapes[i]
        )
      ) {
        return currentShapes[i];
      }
    }

    return null;
  };

  /*
   * ==========================================
   * GRID
   * ==========================================
   */

  const drawGrid = (ctx) => {
    ctx.save();

    ctx.strokeStyle =
      "#e2e8f0";

    ctx.lineWidth = 1;

    const gridSize = 25;

    for (
      let x = 0;
      x <= CANVAS_WIDTH;
      x += gridSize
    ) {
      ctx.beginPath();

      ctx.moveTo(x, 0);

      ctx.lineTo(
        x,
        CANVAS_HEIGHT
      );

      ctx.stroke();
    }

    for (
      let y = 0;
      y <= CANVAS_HEIGHT;
      y += gridSize
    ) {
      ctx.beginPath();

      ctx.moveTo(0, y);

      ctx.lineTo(
        CANVAS_WIDTH,
        y
      );

      ctx.stroke();
    }

    ctx.restore();
  };

  /*
   * ==========================================
   * CONNECTED ARROW
   * ==========================================
   */

  const getConnectedArrowPoints =
    (shape) => {
      if (
        shape.type !== "arrow" ||
        !shape.fromId ||
        !shape.toId
      ) {
        return {
          x1: shape.x,
          y1: shape.y,
          x2: shape.x2,
          y2: shape.y2,
        };
      }

      const currentShapes =
        shapesRef.current;

      const from =
        currentShapes.find(
          (s) =>
            s.id ===
            shape.fromId
        );

      const to =
        currentShapes.find(
          (s) =>
            s.id ===
            shape.toId
        );

      if (!from || !to) {
        return {
          x1: shape.x,
          y1: shape.y,
          x2: shape.x2,
          y2: shape.y2,
        };
      }

      const start =
        getCenter(from);

      const end =
        getCenter(to);

      return {
        x1: start.x,
        y1: start.y,
        x2: end.x,
        y2: end.y,
      };
    };

  /*
   * ==========================================
   * DRAW SHAPE
   * ==========================================
   */

  const drawShape = (
    ctx,
    shape
  ) => {
    ctx.save();

    const stroke =
      shape.stroke ||
      COLORS.blue;

    const fill =
      shape.fill ||
      "#eff6ff";

    ctx.strokeStyle = stroke;

    ctx.fillStyle = fill;

    ctx.lineWidth =
      shape.lineWidth || 2;

    /*
     * RECTANGLE
     */

    if (shape.type === "rect") {
      ctx.beginPath();

      ctx.rect(
        shape.x,
        shape.y,
        shape.width,
        shape.height
      );

      ctx.fill();

      ctx.stroke();
    }

    /*
     * ROUND RECTANGLE
     */

    if (
      shape.type ===
      "roundRect"
    ) {
      const radius = 12;

      ctx.beginPath();

      ctx.roundRect(
        shape.x,
        shape.y,
        shape.width,
        shape.height,
        radius
      );

      ctx.fill();

      ctx.stroke();
    }

    /*
     * CIRCLE
     */

    if (
      shape.type === "circle"
    ) {
      ctx.beginPath();

      ctx.arc(
        shape.x,
        shape.y,
        shape.radius,
        0,
        Math.PI * 2
      );

      ctx.fill();

      ctx.stroke();
    }

    /*
     * ELLIPSE
     */

    if (
      shape.type === "ellipse"
    ) {
      ctx.beginPath();

      ctx.ellipse(
        shape.x,
        shape.y,
        shape.radiusX,
        shape.radiusY,
        0,
        0,
        Math.PI * 2
      );

      ctx.fill();

      ctx.stroke();
    }

    /*
     * DIAMOND
     */

    if (
      shape.type === "diamond"
    ) {
      const cx =
        shape.x +
        shape.width / 2;

      const cy =
        shape.y +
        shape.height / 2;

      ctx.beginPath();

      ctx.moveTo(
        cx,
        shape.y
      );

      ctx.lineTo(
        shape.x +
          shape.width,
        cy
      );

      ctx.lineTo(
        cx,
        shape.y +
          shape.height
      );

      ctx.lineTo(
        shape.x,
        cy
      );

      ctx.closePath();

      ctx.fill();

      ctx.stroke();
    }

    /*
     * LINE / ARROW
     */

    if (
      shape.type === "line" ||
      shape.type === "arrow"
    ) {
      const points =
        getConnectedArrowPoints(
          shape
        );

      ctx.beginPath();

      ctx.moveTo(
        points.x1,
        points.y1
      );

      ctx.lineTo(
        points.x2,
        points.y2
      );

      ctx.stroke();

      if (
        shape.type === "arrow"
      ) {
        drawArrowHead(
          ctx,
          points.x1,
          points.y1,
          points.x2,
          points.y2,
          stroke
        );
      }
    }

    /*
     * TEXT
     */

    if (
      shape.type === "text"
    ) {
      ctx.fillStyle =
        shape.color ||
        "#0f172a";

      ctx.font =
        `${shape.fontSize || 20}px Arial`;

      ctx.textAlign = "center";

      ctx.textBaseline =
        "middle";

      ctx.fillText(
        shape.text || "Text",
        shape.x,
        shape.y
      );
    }

    /*
     * IMAGE
     */

    if (
      shape.type === "image"
    ) {
      if (
        shape.imageElement
      ) {
        ctx.drawImage(
          shape.imageElement,
          shape.x,
          shape.y,
          shape.width,
          shape.height
        );
      }
    }

    ctx.restore();

    /*
     * SELECTION OUTLINE
     */

    if (
      selectedId === shape.id
    ) {
      ctx.save();

      ctx.strokeStyle =
        "#f97316";

      ctx.lineWidth = 2;

      ctx.setLineDash([
        6,
        4,
      ]);

      if (
        shape.type === "circle"
      ) {
        ctx.strokeRect(
          shape.x -
            shape.radius -
            6,
          shape.y -
            shape.radius -
            6,
          shape.radius * 2 +
            12,
          shape.radius * 2 +
            12
        );
      } else if (
        shape.type ===
        "ellipse"
      ) {
        ctx.strokeRect(
          shape.x -
            shape.radiusX -
            6,
          shape.y -
            shape.radiusY -
            6,
          shape.radiusX * 2 +
            12,
          shape.radiusY * 2 +
            12
        );
      } else if (
        shape.type === "line" ||
        shape.type === "arrow"
      ) {
        const points =
          getConnectedArrowPoints(
            shape
          );

        ctx.strokeRect(
          Math.min(
            points.x1,
            points.x2
          ) - 6,

          Math.min(
            points.y1,
            points.y2
          ) - 6,

          Math.abs(
            points.x2 -
              points.x1
          ) + 12,

          Math.abs(
            points.y2 -
              points.y1
          ) + 12
        );
      } else if (
        shape.type === "text"
      ) {
        const width =
          shape.textWidth ||
          120;

        ctx.strokeRect(
          shape.x -
            width / 2 -
            6,

          shape.y -
            20 -
            6,

          width + 12,

          40 + 12
        );
      } else {
        ctx.strokeRect(
          shape.x - 6,
          shape.y - 6,
          shape.width + 12,
          shape.height + 12
        );
      }

      ctx.restore();
    }
  };

  /*
   * ==========================================
   * REDRAW
   * ==========================================
   */

  const redraw = () => {
    const canvas =
      canvasRef.current;

    if (!canvas) {
      return;
    }

    const ctx =
      canvas.getContext("2d");

    ctx.clearRect(
      0,
      0,
      CANVAS_WIDTH,
      CANVAS_HEIGHT
    );

    ctx.fillStyle =
      "#ffffff";

    ctx.fillRect(
      0,
      0,
      CANVAS_WIDTH,
      CANVAS_HEIGHT
    );

    drawGrid(ctx);

    const arrows =
      shapes.filter(
        (shape) =>
          shape.type ===
            "arrow" &&
          shape.fromId &&
          shape.toId
      );

    const normalShapes =
      shapes.filter(
        (shape) =>
          !(
            shape.type ===
              "arrow" &&
            shape.fromId &&
            shape.toId
          )
      );

    arrows.forEach(
      (shape) =>
        drawShape(
          ctx,
          shape
        )
    );

    normalShapes.forEach(
      (shape) =>
        drawShape(
          ctx,
          shape
        )
    );

    if (tempShape) {
      drawShape(
        ctx,
        tempShape
      );
    }
  };

  useEffect(() => {
    redraw();
  }, [
    shapes,
    selectedId,
    tempShape,
  ]);

  /*
   * ==========================================
   * CREATE SHAPE
   * ==========================================
   */

  const createShape = (
    type,
    start,
    end
  ) => {
    const x =
      Math.min(
        start.x,
        end.x
      );

    const y =
      Math.min(
        start.y,
        end.y
      );

    const width =
      Math.abs(
        end.x -
          start.x
      );

    const height =
      Math.abs(
        end.y -
          start.y
      );

    const base = {
      id: createId(),

      stroke:
        COLORS.blue,

      fill:
        "#eff6ff",

      lineWidth: 2,
    };

    if (
      type === "rect" ||
      type === "roundRect" ||
      type === "diamond"
    ) {
      return {
        ...base,

        type,

        x,

        y,

        width:
          Math.max(
            width,
            80
          ),

        height:
          Math.max(
            height,
            50
          ),
      };
    }

    if (
      type === "circle"
    ) {
      const radius =
        Math.max(
          width,
          height,
          40
        ) / 2;

      return {
        ...base,

        type,

        x: start.x,

        y: start.y,

        radius,
      };
    }

    if (
      type === "ellipse"
    ) {
      return {
        ...base,

        type,

        x: start.x,

        y: start.y,

        radiusX:
          Math.max(
            width / 2,
            60
          ),

        radiusY:
          Math.max(
            height / 2,
            40
          ),
      };
    }

    if (
      type === "line" ||
      type === "arrow"
    ) {
      return {
        ...base,

        type,

        x: start.x,

        y: start.y,

        x2: end.x,

        y2: end.y,

        fill:
          "transparent",
      };
    }

    return null;
  };

  /*
   * ==========================================
   * MOUSE DOWN
   * ==========================================
   */

  const handleMouseDown = (
    e
  ) => {
    if (e.button !== 0) {
      return;
    }

    const pos =
      getMousePosition(e);

    const found =
      findShapeAt(
        pos.x,
        pos.y
      );

    /*
     * ======================================
     * SELECT TOOL
     * ======================================
     */

    if (
      tool === "select"
    ) {
      if (found) {
        setSelectedId(
          found.id
        );

        const center =
          getCenter(found);

        let offsetX =
          pos.x -
          center.x;

        let offsetY =
          pos.y -
          center.y;

        if (
          found.type ===
            "rect" ||
          found.type ===
            "roundRect" ||
          found.type ===
            "diamond" ||
          found.type ===
            "image"
        ) {
          offsetX =
            pos.x -
            found.x;

          offsetY =
            pos.y -
            found.y;
        }

        interactionRef.current = {
          mode: "drag",

          shapeId:
            found.id,

          startX: pos.x,

          startY: pos.y,

          offsetX,

          offsetY,

          originalShapes:
            cleanShapes(
              shapesRef.current
            ),

          moved: false,
        };
      } else {
        setSelectedId(null);

        interactionRef.current = {
          mode: null,
          shapeId: null,
        };
      }

      return;
    }

    /*
     * ======================================
     * DIRECT DRAG EXISTING SHAPE
     * ======================================
     *
     * THIS IS THE MAIN FEATURE.
     *
     * Box tool active:
     *
     * existing box -> drag -> move
     *
     * empty canvas -> drag -> create
     */

    if (
      found &&
      tool !== "connect" &&
      tool !== "text" &&
      tool !== "image"
    ) {
      setSelectedId(
        found.id
      );

      const center =
        getCenter(found);

      let offsetX =
        pos.x -
        center.x;

      let offsetY =
        pos.y -
        center.y;

      if (
        found.type ===
          "rect" ||
        found.type ===
          "roundRect" ||
        found.type ===
          "diamond" ||
        found.type ===
          "image"
      ) {
        offsetX =
          pos.x -
          found.x;

        offsetY =
          pos.y -
          found.y;
      }

      interactionRef.current = {
        mode: "drag",

        shapeId:
          found.id,

        startX: pos.x,

        startY: pos.y,

        offsetX,

        offsetY,

        originalShapes:
          cleanShapes(
            shapesRef.current
          ),

        moved: false,
      };

      return;
    }

    /*
     * ======================================
     * CONNECT
     * ======================================
     */

    if (
      tool === "connect"
    ) {
      if (!found) {
        return;
      }

      if (
        found.type ===
          "line" ||
        found.type ===
          "arrow" ||
        found.type ===
          "text" ||
        found.type ===
          "image"
      ) {
        return;
      }

      if (!connectStart) {
        setConnectStart(
          found
        );

        setSelectedId(
          found.id
        );
      } else {
        if (
          connectStart.id !==
          found.id
        ) {
          saveHistory(
            shapesRef.current
          );

          const start =
            getCenter(
              connectStart
            );

          const end =
            getCenter(
              found
            );

          const arrow = {
            id: createId(),

            type: "arrow",

            x: start.x,

            y: start.y,

            x2: end.x,

            y2: end.y,

            stroke:
              COLORS.red,

            fill:
              "transparent",

            lineWidth: 3,

            fromId:
              connectStart.id,

            toId:
              found.id,
          };

          setShapes((prev) => [
            ...prev,
            arrow,
          ]);
        }

        setConnectStart(
          null
        );
      }

      return;
    }

    /*
     * ======================================
     * TEXT
     * ======================================
     */

    if (
      tool === "text"
    ) {
      setStartPoint(pos);

      setShowTextBox(true);

      return;
    }

    /*
     * ======================================
     * IMAGE
     * ======================================
     */

    if (
      tool === "image"
    ) {
      return;
    }

    /*
     * ======================================
     * CREATE NEW SHAPE
     * ======================================
     */

    const drawingTools = [
      "rect",
      "roundRect",
      "circle",
      "ellipse",
      "diamond",
      "line",
      "arrow",
    ];

    if (
      drawingTools.includes(
        tool
      )
    ) {
      setIsDrawing(true);

      setStartPoint(pos);

      const initial =
        createShape(
          tool,
          pos,
          {
            x:
              pos.x + 1,

            y:
              pos.y + 1,
          }
        );

      setTempShape(
        initial
      );
    }
  };

  /*
   * ==========================================
   * MOUSE MOVE
   * ==========================================
   */

  const handleMouseMove = (
    e
  ) => {
    const pos =
      getMousePosition(e);

    /*
     * ======================================
     * DRAG EXISTING SHAPE
     * ======================================
     */

    if (
      interactionRef.current
        .mode === "drag"
    ) {
      const {
        shapeId,
        offsetX,
        offsetY,
      } =
        interactionRef.current;

      if (!shapeId) {
        return;
      }

      interactionRef.current.moved =
        true;

      setShapes((prev) =>
        prev.map(
          (shape) => {
            if (
              shape.id !==
              shapeId
            ) {
              return shape;
            }

            /*
             * CIRCLE
             */

            if (
              shape.type ===
              "circle"
            ) {
              return {
                ...shape,

                x:
                  pos.x -
                  offsetX,

                y:
                  pos.y -
                  offsetY,
              };
            }

            /*
             * ELLIPSE
             */

            if (
              shape.type ===
              "ellipse"
            ) {
              return {
                ...shape,

                x:
                  pos.x -
                  offsetX,

                y:
                  pos.y -
                  offsetY,
              };
            }

            /*
             * TEXT
             */

            if (
              shape.type ===
              "text"
            ) {
              return {
                ...shape,

                x:
                  pos.x -
                  offsetX,

                y:
                  pos.y -
                  offsetY,
              };
            }

            /*
             * LINE / ARROW
             */

            if (
              shape.type ===
                "line" ||
              shape.type ===
                "arrow"
            ) {
              /*
               * Connected arrow follows boxes.
               */

              if (
                shape.fromId &&
                shape.toId
              ) {
                return shape;
              }

              const dx =
                pos.x -
                interactionRef
                  .current
                  .startX;

              const dy =
                pos.y -
                interactionRef
                  .current
                  .startY;

              return {
                ...shape,

                x:
                  shape.x +
                  dx,

                y:
                  shape.y +
                  dy,

                x2:
                  shape.x2 +
                  dx,

                y2:
                  shape.y2 +
                  dy,
              };
            }

            /*
             * RECTANGLE /
             * ROUND RECT /
             * DIAMOND /
             * IMAGE
             */

            return {
              ...shape,

              x:
                pos.x -
                offsetX,

              y:
                pos.y -
                offsetY,
            };
          }
        )
      );

      interactionRef.current.startX =
        pos.x;

      interactionRef.current.startY =
        pos.y;

      return;
    }

    /*
     * ======================================
     * CREATE NEW SHAPE
     * ======================================
     */

    if (
      !isDrawing ||
      !startPoint
    ) {
      return;
    }

    const newShape =
      createShape(
        tool,
        startPoint,
        pos
      );

    setTempShape(
      newShape
    );
  };

  /*
   * ==========================================
   * MOUSE UP
   * ==========================================
   */

  const handleMouseUp = () => {
    /*
     * ======================================
     * DRAG END
     * ======================================
     */

    if (
      interactionRef.current
        .mode === "drag"
    ) {
      const original =
        interactionRef.current
          .originalShapes;

      const moved =
        interactionRef.current
          .moved;

      if (
        original &&
        moved
      ) {
        saveHistory(
          original
        );
      }

      interactionRef.current = {
        mode: null,

        shapeId: null,

        startX: 0,

        startY: 0,

        offsetX: 0,

        offsetY: 0,

        originalShapes: null,

        moved: false,
      };

      return;
    }

    /*
     * ======================================
     * CREATE END
     * ======================================
     */

    if (
      !isDrawing ||
      !tempShape
    ) {
      return;
    }

    saveHistory(
      shapesRef.current
    );

    setShapes((prev) => [
      ...prev,
      tempShape,
    ]);

    setSelectedId(
      tempShape.id
    );

    setTempShape(null);

    setStartPoint(null);

    setIsDrawing(false);
  };

  /*
   * ==========================================
   * ADD TEXT
   * ==========================================
   */

  const addText = () => {
    if (
      !textValue.trim()
    ) {
      setShowTextBox(false);

      return;
    }

    saveHistory(
      shapesRef.current
    );

    const textShape = {
      id: createId(),

      type: "text",

      x:
        startPoint?.x ||
        CANVAS_WIDTH / 2,

      y:
        startPoint?.y ||
        CANVAS_HEIGHT / 2,

      text: textValue,

      fontSize: 20,

      color: "#0f172a",

      textWidth:
        Math.max(
          120,
          textValue.length *
            11
        ),
    };

    setShapes((prev) => [
      ...prev,
      textShape,
    ]);

    setSelectedId(
      textShape.id
    );

    setTextValue("");

    setShowTextBox(false);

    setStartPoint(null);
  };

  /*
   * ==========================================
   * DELETE
   * ==========================================
   */

  const deleteSelected = () => {
    if (!selectedId) {
      return;
    }

    saveHistory(
      shapesRef.current
    );

    setShapes((prev) =>
      prev.filter(
        (shape) =>
          shape.id !==
            selectedId &&
          shape.fromId !==
            selectedId &&
          shape.toId !==
            selectedId
      )
    );

    setSelectedId(null);
  };

  /*
   * ==========================================
   * CLEAR
   * ==========================================
   */

  const clearDiagram = () => {
    if (
      shapes.length === 0
    ) {
      return;
    }

    if (
      !window.confirm(
        "Clear entire diagram?"
      )
    ) {
      return;
    }

    saveHistory(
      shapesRef.current
    );

    setShapes([]);

    setSelectedId(null);

    setConnectStart(null);
  };

  /*
   * ==========================================
   * NEW DIAGRAM
   * ==========================================
   */

  const newDiagram = () => {
    if (
      shapes.length > 0 &&
      !window.confirm(
        "Create a new diagram? Current diagram will be cleared."
      )
    ) {
      return;
    }

    setShapes([]);

    setHistory([]);

    setSelectedId(null);

    setConnectStart(null);

    setDiagramName(
      "Untitled Diagram"
    );
  };

  /*
   * ==========================================
   * SAVE DIAGRAM
   * ==========================================
   */

  const saveDiagram = () => {
    if (
      shapesRef.current.length ===
      0
    ) {
      alert(
        "Please create at least one shape before saving."
      );

      return;
    }

  

    const savedDiagram = {
      id: createId(),

      name,

      createdAt:
        new Date().toISOString(),

      canvasWidth:
        CANVAS_WIDTH,

      canvasHeight:
        CANVAS_HEIGHT,

      shapes:
        cleanShapes(
          shapesRef.current
        ),

      imageDataUrl:
        canvasRef.current
          ? canvasRef.current.toDataURL("image/png")
          : null,
    };

    let existing = [];

    try {
      existing =
        JSON.parse(
          localStorage.getItem(
            SAVED_DIAGRAMS_KEY
          ) || "[]"
        );
    } catch {
      existing = [];
    }

    const existingIndex =
      existing.findIndex(
        (diagram) =>
          diagram.name === name
      );

    if (
      existingIndex !== -1
    ) {
      const replace =
        window.confirm(
          `"${name}" already exists.\n\nDo you want to update it?`
        );

      if (!replace) {
        return;
      }

      savedDiagram.id =
        existing[
          existingIndex
        ].id;

      existing[
        existingIndex
      ] = savedDiagram;
    } else {
      existing.push(
        savedDiagram
      );
    }

    try {
      localStorage.setItem(
        SAVED_DIAGRAMS_KEY,
        JSON.stringify(existing)
      );
    } catch (error) {
      console.error(
        "Could not save diagram:",
        error
      );

      alert(
        "Could not save diagram. Browser storage may be full."
      );

      return;
    }

    /*
     * Notify QuestionPaperBuilder
     */

    window.dispatchEvent(
      new CustomEvent(
        "diagramSaved",
        {
          detail:
            savedDiagram,
        }
      )
    );

    if (typeof onSave === "function") {
      onSave(savedDiagram);
    }

    alert(
      `"${name}" saved successfully!`
    );
  };

  /*
   * ==========================================
   * DOWNLOAD PNG
   * ==========================================
   */

  const downloadPNG = () => {
    const canvas =
      canvasRef.current;

    if (!canvas) {
      return;
    }

    const link =
      document.createElement("a");

    link.download =
      `${
        diagramName ||
        "diagram"
      }.png`;

    link.href =
      canvas.toDataURL(
        "image/png"
      );

    link.click();
  };

  /*
   * ==========================================
   * IMAGE UPLOAD
   * ==========================================
   */

  const handleImageUpload = (
    e
  ) => {
    const file =
      e.target.files?.[0];

    if (!file) {
      return;
    }

    const reader =
      new FileReader();

    reader.onload = () => {
      const image =
        new Image();

      image.onload = () => {
        saveHistory(
          shapesRef.current
        );

        const maxWidth = 300;

        const maxHeight = 220;

        let width =
          image.width;

        let height =
          image.height;

        const scale =
          Math.min(
            maxWidth /
              width,

            maxHeight /
              height,

            1
          );

        width *= scale;

        height *= scale;

        const imageShape = {
          id: createId(),

          type: "image",

          x: 100,

          y: 100,

          width,

          height,

          imageElement:
            image,

          imageSrc:
            reader.result,
        };

        setShapes((prev) => [
          ...prev,
          imageShape,
        ]);

        setSelectedId(
          imageShape.id
        );

        /*
         * Keep current tool.
         *
         * This means image can also be
         * directly dragged after upload.
         */
      };

      image.src =
        reader.result;
    };

    reader.readAsDataURL(file);

    e.target.value = "";
  };

  /*
   * ==========================================
   * TOOL BUTTON
   * ==========================================
   */

  const toolButton = (
    value,
    label,
    icon
  ) => {
    return (
      <button
        type="button"
        onClick={() => {
          setTool(value);

          setConnectStart(
            null
          );

          interactionRef.current = {
            mode: null,
            shapeId: null,
          };

          setIsDrawing(false);

          setTempShape(null);

          setStartPoint(null);
        }}
        style={{
          minWidth: 82,

          height: 42,

          border:
            tool === value
              ? "2px solid #2563eb"
              : "1px solid #cbd5e1",

          background:
            tool === value
              ? "#eff6ff"
              : "#ffffff",

          color:
            tool === value
              ? "#1d4ed8"
              : "#334155",

          borderRadius: 8,

          cursor: "pointer",

          fontWeight:
            tool === value
              ? 700
              : 500,

          display: "flex",

          alignItems:
            "center",

          justifyContent:
            "center",

          gap: 5,
        }}
      >
        <span
          style={{
            fontSize: 17,
          }}
        >
          {icon}
        </span>

        <span
          style={{
            fontSize: 12,
          }}
        >
          {label}
        </span>
      </button>
    );
  };

  /*
   * ==========================================
   * JSX
   * ==========================================
   */

  return (
    <div
      style={{
        minHeight:
          "100vh",

        background:
          "#f1f5f9",

        padding: 20,

        fontFamily:
          "Segoe UI, Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 1250,

          margin: "0 auto",
        }}
      >
        {/* HEADER */}

        <div
          style={{
            background:
              "#ffffff",

            borderRadius: 12,

            padding:
              "16px 20px",

            marginBottom: 15,

            border:
              "1px solid #e2e8f0",

            display: "flex",

            alignItems:
              "center",

            justifyContent:
              "space-between",

            gap: 20,
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,

                color:
                  "#0f172a",

                fontSize: 22,
              }}
            >
              Diagram Editor
            </h2>

            <div
              style={{
                color:
                  "#64748b",

                fontSize: 12,

                marginTop: 4,
              }}
            >
              Create diagrams,
              flowcharts and
              question-paper
              diagrams
            </div>
          </div>

          <input
            value={diagramName}
            onChange={(e) =>
              setDiagramName(
                e.target.value
              )
            }
            style={{
              width: 240,

              padding:
                "9px 12px",

              border:
                "1px solid #cbd5e1",

              borderRadius: 7,

              outline: "none",
            }}
            placeholder="Diagram name"
          />
        </div>

        {/* TOOLBAR */}

        <div
          style={{
            background:
              "#ffffff",

            borderRadius: 12,

            padding: 12,

            marginBottom: 15,

            border:
              "1px solid #e2e8f0",

            display: "flex",

            flexWrap:
              "wrap",

            gap: 8,

            alignItems:
              "center",
          }}
        >
          {toolButton(
            "select",
            "Select",
            "🖱️"
          )}

          {toolButton(
            "rect",
            "Box",
            "▭"
          )}

          {toolButton(
            "roundRect",
            "Round Box",
            "▢"
          )}

          {toolButton(
            "circle",
            "Circle",
            "○"
          )}

          {toolButton(
            "ellipse",
            "Ellipse",
            "⬭"
          )}

          {toolButton(
            "diamond",
            "Diamond",
            "◇"
          )}

          {toolButton(
            "line",
            "Line",
            "╱"
          )}

          {toolButton(
            "arrow",
            "Arrow",
            "➜"
          )}

          {toolButton(
            "connect",
            "Connect",
            "🔗"
          )}

          {toolButton(
            "text",
            "Text",
            "T"
          )}

          {/* IMAGE */}

          <label
            style={{
              minWidth: 82,

              height: 42,

              border:
                "1px solid #cbd5e1",

              background:
                "#ffffff",

              color:
                "#334155",

              borderRadius: 8,

              cursor: "pointer",

              fontWeight: 500,

              display: "flex",

              alignItems:
                "center",

              justifyContent:
                "center",

              gap: 5,

              fontSize: 12,
            }}
          >
            🖼️ Image

            <input
              type="file"
              accept="image/*"
              onChange={
                handleImageUpload
              }
              style={{
                display: "none",
              }}
            />
          </label>

          <div
            style={{
              width: 1,

              height: 32,

              background:
                "#e2e8f0",

              margin:
                "0 5px",
            }}
          />

          {/* UNDO */}

          <button
            type="button"
            onClick={undo}
            disabled={
              history.length ===
              0
            }
            style={{
              height: 42,

              padding:
                "0 14px",

              border:
                "1px solid #cbd5e1",

              background:
                history.length ===
                0
                  ? "#f8fafc"
                  : "#ffffff",

              borderRadius: 8,

              cursor:
                history.length ===
                0
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            ↩️ Undo
          </button>

          {/* DELETE */}

          <button
            type="button"
            onClick={
              deleteSelected
            }
            disabled={
              !selectedId
            }
            style={{
              height: 42,

              padding:
                "0 14px",

              border:
                "1px solid #fecaca",

              background:
                "#fff1f2",

              color:
                "#dc2626",

              borderRadius: 8,

              cursor:
                selectedId
                  ? "pointer"
                  : "not-allowed",
            }}
          >
            🗑️ Delete
          </button>

          {/* CLEAR */}

          <button
            type="button"
            onClick={
              clearDiagram
            }
            style={{
              height: 42,

              padding:
                "0 14px",

              border:
                "1px solid #fecaca",

              background:
                "#ffffff",

              color:
                "#dc2626",

              borderRadius: 8,

              cursor:
                "pointer",
            }}
          >
            🧹 Clear
          </button>

          {/* NEW */}


          {/* SAVE */}

          <button
            type="button"
            onClick={
              saveDiagram
            }
            disabled={
              shapes.length ===
              0
            }
            style={{
              height: 42,

              padding:
                "0 16px",

              border: "none",

              background:
                shapes.length ===
                0
                  ? "#94a3b8"
                  : "#7c3aed",

              color:
                "#ffffff",

              borderRadius: 8,

              cursor:
                shapes.length ===
                0
                  ? "not-allowed"
                  : "pointer",

              fontWeight: 700,
            }}
          >
            💾 Save Diagram
          </button>

          {/* PNG */}

          <button
            type="button"
            onClick={
              downloadPNG
            }
            style={{
              height: 42,

              padding:
                "0 16px",

              border: "none",

              background:
                "#16a34a",

              color:
                "#ffffff",

              borderRadius: 8,

              cursor:
                "pointer",

              fontWeight: 700,
            }}
          >
            📥 Download PNG
          </button>
        </div>

        {/* CONNECT MESSAGE */}

        {tool ===
          "connect" && (
          <div
            style={{
              background:
                "#eff6ff",

              border:
                "1px solid #bfdbfe",

              color:
                "#1e40af",

              padding:
                "10px 14px",

              borderRadius: 8,

              marginBottom: 12,

              fontSize: 13,
            }}
          >
            🔗 Connect mode:
            first click one
            box, then click
            another box.

            {connectStart && (
              <b>
                {" "}
                First box selected ✓
              </b>
            )}
          </div>
        )}

        {/* CANVAS */}

        <div
          style={{
            background:
              "#ffffff",

            padding: 15,

            borderRadius: 12,

            border:
              "1px solid #cbd5e1",

            boxShadow:
              "0 4px 12px rgba(15,23,42,0.08)",

            overflow: "auto",
          }}
        >
          <canvas
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={
              CANVAS_HEIGHT
            }
            onMouseDown={
              handleMouseDown
            }
            onMouseMove={
              handleMouseMove
            }
            onMouseUp={
              handleMouseUp
            }
            onMouseLeave={
              handleMouseUp
            }
            style={{
              display: "block",

              width: "100%",

              maxWidth:
                CANVAS_WIDTH,

              height: "auto",

              border:
                "1px solid #cbd5e1",

              borderRadius: 6,

              cursor:
                tool === "connect"
                  ? "crosshair"
                  : "crosshair",
            }}
          />
        </div>

        {/* HELP */}

        <div
          style={{
            marginTop: 12,

            background:
              "#ffffff",

            padding:
              "12px 16px",

            borderRadius: 10,

            border:
              "1px solid #e2e8f0",

            fontSize: 12,

            color:
              "#64748b",
          }}
        >
          <b
            style={{
              color:
                "#334155",
            }}
          >
            How to use:
          </b>{" "}
          Select any shape
          tool and drag on empty
          canvas to create.

          <br />

          <b>
            Existing shape மீது
            drag
          </b>{" "}
          செய்தால் Select tool
          போகாமலேயே shape move
          ஆகும்.

          <br />

          Use{" "}
          <b>Connect</b> to
          connect two boxes.

          <br />

          Use{" "}
          <b>💾 Save Diagram</b>{" "}
          to make the diagram
          available inside
          QuestionPaperBuilder.
        </div>
      </div>

      {/* TEXT MODAL */}

      {showTextBox && (
        <div
          style={{
            position:
              "fixed",

            inset: 0,

            background:
              "rgba(15,23,42,0.45)",

            display: "flex",

            alignItems:
              "center",

            justifyContent:
              "center",

            zIndex: 9999,
          }}
        >
          <div
            style={{
              background:
                "#ffffff",

              width: 350,

              padding: 20,

              borderRadius: 12,

              boxShadow:
                "0 10px 30px rgba(0,0,0,0.2)",
            }}
          >
            <h3
              style={{
                marginTop: 0,
              }}
            >
              Add Text
            </h3>

            <input
              autoFocus
              value={textValue}
              onChange={(e) =>
                setTextValue(
                  e.target.value
                )
              }
              onKeyDown={(e) => {
                if (
                  e.key ===
                  "Enter"
                ) {
                  addText();
                }
              }}
              placeholder="Enter text"
              style={{
                width: "100%",

                boxSizing:
                  "border-box",

                padding:
                  "10px 12px",

                border:
                  "1px solid #cbd5e1",

                borderRadius: 7,

                outline: "none",
              }}
            />

            <div
              style={{
                display: "flex",

                justifyContent:
                  "flex-end",

                gap: 8,

                marginTop: 15,
              }}
            >
              <button
                type="button"
                onClick={() => {
                  setShowTextBox(
                    false
                  );

                  setTextValue("");

                  setStartPoint(
                    null
                  );
                }}
                style={{
                  padding:
                    "9px 14px",

                  border:
                    "1px solid #cbd5e1",

                  background:
                    "#ffffff",

                  borderRadius: 7,

                  cursor:
                    "pointer",
                }}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={addText}
                style={{
                  padding:
                    "9px 16px",

                  border: "none",

                  background:
                    "#2563eb",

                  color:
                    "#ffffff",

                  borderRadius: 7,

                  cursor:
                    "pointer",

                  fontWeight: 600,
                }}
              >
                Add Text
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}