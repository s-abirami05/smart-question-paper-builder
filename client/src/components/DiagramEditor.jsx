import React, { useEffect, useState } from "react";


export default function DiagramEditor({ onSave, initialData }) {
  const [boxes, setBoxes] = useState([]);
  const [arrows, setArrows] = useState([]);
  const [texts, setTexts] = useState([]);

  const [selectedObject, setSelectedObject] = useState(null);

  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const saveToHistory = (newBoxes, newArrows, newTexts) => {
    const newState = {
      boxes: newBoxes,
      arrows: newArrows,
      texts: newTexts,
    };

    const newHistory = history.slice(0, historyIndex + 1);

    newHistory.push(newState);

    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  // -----------------------------
  // ADD RECTANGLE
  // -----------------------------
  const addBox = () => {
    const newBoxes = [
      ...boxes,
      {
        id: Date.now(),
        x: 100 + boxes.length * 20,
        y: 100 + boxes.length * 20,
        width: 150,
        height: 70,
      },
    ];

    setBoxes(newBoxes);
    saveToHistory(newBoxes, arrows, texts);
  };

  // -----------------------------
  // ADD ARROW
  // -----------------------------
  const addArrow = () => {
    const newArrows = [
      ...arrows,
      {
        id: Date.now(),
        x1: 175,
        y1: 170,
        x2: 175,
        y2: 250,
      },
    ];

    setArrows(newArrows);
    saveToHistory(boxes, newArrows, texts);
  };

  // -----------------------------
  // ADD TEXT
  // -----------------------------
  const addText = () => {
    const text = window.prompt("Enter text:");

    if (!text || !text.trim()) return;

    const newTexts = [
      ...texts,
      {
        id: Date.now(),
        text: text.trim(),
        x: 120,
        y: 120 + texts.length * 50,
      },
    ];

    setTexts(newTexts);
    saveToHistory(boxes, arrows, newTexts);
  };

  // -----------------------------
  // MOVE RECTANGLE
  // -----------------------------
  const moveBox = (id, newX, newY) => {
    setBoxes((prev) =>
      prev.map((box) =>
        box.id === id
          ? {
              ...box,
              x: newX,
              y: newY,
            }
          : box
      )
    );
  };

  // -----------------------------
  // MOVE TEXT
  // -----------------------------
  const moveText = (id, newX, newY) => {
    setTexts((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              x: newX,
              y: newY,
            }
          : item
      )
    );
  };

  // -----------------------------
  // DRAG RECTANGLE
  // -----------------------------
  const handleBoxMouseDown = (event, box) => {
    event.preventDefault();

    setSelectedObject({
      type: "box",
      id: box.id,
    });

    const startMouseX = event.clientX;
    const startMouseY = event.clientY;

    const startX = box.x;
    const startY = box.y;

    const handleMouseMove = (moveEvent) => {
      const newX = Math.max(
        0,
        startX + moveEvent.clientX - startMouseX
      );

      const newY = Math.max(
        0,
        startY + moveEvent.clientY - startMouseY
      );

      moveBox(box.id, newX, newY);
    };

    const handleMouseUp = (upEvent) => {
      const finalX = Math.max(
        0,
        startX + upEvent.clientX - startMouseX
      );

      const finalY = Math.max(
        0,
        startY + upEvent.clientY - startMouseY
      );

      const newBoxes = boxes.map((item) =>
        item.id === box.id
          ? {
              ...item,
              x: finalX,
              y: finalY,
            }
          : item
      );

      setBoxes(newBoxes);

      saveToHistory(newBoxes, arrows, texts);

      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // -----------------------------
  // DRAG TEXT
  // -----------------------------
  const handleTextMouseDown = (event, item) => {
    event.preventDefault();

    setSelectedObject({
      type: "text",
      id: item.id,
    });

    const startMouseX = event.clientX;
    const startMouseY = event.clientY;

    const startX = item.x;
    const startY = item.y;

    const handleMouseMove = (moveEvent) => {
      const newX = Math.max(
        0,
        startX + moveEvent.clientX - startMouseX
      );

      const newY = Math.max(
        0,
        startY + moveEvent.clientY - startMouseY
      );

      moveText(item.id, newX, newY);
    };

    const handleMouseUp = (upEvent) => {
      const finalX = Math.max(
        0,
        startX + upEvent.clientX - startMouseX
      );

      const finalY = Math.max(
        0,
        startY + upEvent.clientY - startMouseY
      );

      const newTexts = texts.map((textItem) =>
        textItem.id === item.id
          ? {
              ...textItem,
              x: finalX,
              y: finalY,
            }
          : textItem
      );

      setTexts(newTexts);

      saveToHistory(boxes, arrows, newTexts);

      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // -----------------------------
  // DELETE SELECTED
  // -----------------------------
  const deleteSelected = () => {
    if (!selectedObject) return;

    let newBoxes = boxes;
    let newArrows = arrows;
    let newTexts = texts;

    if (selectedObject.type === "box") {
      newBoxes = boxes.filter(
        (box) => box.id !== selectedObject.id
      );
    }

    if (selectedObject.type === "text") {
      newTexts = texts.filter(
        (item) => item.id !== selectedObject.id
      );
    }

    if (selectedObject.type === "arrow") {
      newArrows = arrows.filter(
        (arrow) => arrow.id !== selectedObject.id
      );
    }

    setBoxes(newBoxes);
    setArrows(newArrows);
    setTexts(newTexts);

    setSelectedObject(null);

    saveToHistory(newBoxes, newArrows, newTexts);
  };

  // -----------------------------
  // KEYBOARD DELETE
  // -----------------------------

useEffect(() => {
  if (initialData) {
    setBoxes(initialData.boxes || []);
    setArrows(initialData.arrows || []);
    setTexts(initialData.texts || []);

    const initialState = {
      boxes: initialData.boxes || [],
      arrows: initialData.arrows || [],
      texts: initialData.texts || [],
    };

    setHistory([initialState]);
    setHistoryIndex(0);
  } else {
    setBoxes([]);
    setArrows([]);
    setTexts([]);
    setHistory([]);
    setHistoryIndex(-1);
  }
}, [initialData]);


  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Delete") {
        deleteSelected();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  // -----------------------------
  // SAVE DIAGRAM
  // -----------------------------
  const saveDiagram = () => {
    const diagramData = {
      boxes,
      arrows,
      texts,
    };

    if (onSave) {
      onSave(diagramData);
    }
  };

  // -----------------------------
  // CLEAR ALL
  // -----------------------------
  const clearAll = () => {
    if (
      boxes.length === 0 &&
      arrows.length === 0 &&
      texts.length === 0
    ) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to clear the entire diagram?"
    );

    if (!confirmed) return;

    setBoxes([]);
    setArrows([]);
    setTexts([]);
    setSelectedObject(null);

    saveToHistory([], [], []);
  };

  // -----------------------------
  // UNDO
  // -----------------------------
  const undo = () => {
    if (historyIndex <= 0) return;

    const previousIndex = historyIndex - 1;
    const previousState = history[previousIndex];

    setBoxes(previousState.boxes);
    setArrows(previousState.arrows);
    setTexts(previousState.texts);

    setHistoryIndex(previousIndex);
    setSelectedObject(null);
  };

  // -----------------------------
  // REDO
  // -----------------------------
  const redo = () => {
    if (historyIndex >= history.length - 1) return;

    const nextIndex = historyIndex + 1;
    const nextState = history[nextIndex];

    setBoxes(nextState.boxes);
    setArrows(nextState.arrows);
    setTexts(nextState.texts);

    setHistoryIndex(nextIndex);
    setSelectedObject(null);
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2>Diagram Editor</h2>

      {/* TOOLBAR */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "15px",
          flexWrap: "wrap",
        }}
      >
        <button type="button" onClick={addBox}>
          Rectangle
        </button>

        <button type="button" onClick={addArrow}>
          Arrow
        </button>

        <button type="button" onClick={addText}>
          Text
        </button>

        <button
          type="button"
          onClick={deleteSelected}
          disabled={!selectedObject}
        >
          Delete
        </button>

        <button
          type="button"
          onClick={undo}
          disabled={historyIndex <= 0}
        >
          Undo
        </button>

        <button
          type="button"
          onClick={redo}
          disabled={historyIndex >= history.length - 1}
        >
          Redo
        </button>

        <button type="button" onClick={clearAll}>
          Clear All
        </button>

        {/* SAVE BUTTON */}
        <button type="button" onClick={saveDiagram}>
          Save Diagram
        </button>
      </div>

      {/* CANVAS */}
      <div
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            setSelectedObject(null);
          }
        }}
        style={{
          width: "800px",
          height: "500px",
          border: "1px solid #ccc",
          position: "relative",
          background: "#fff",
          overflow: "hidden",
        }}
      >
        {/* RECTANGLES */}
        {boxes.map((box) => {
          const isSelected =
            selectedObject?.type === "box" &&
            selectedObject?.id === box.id;

          return (
            <div
              key={box.id}
              onMouseDown={(event) =>
                handleBoxMouseDown(event, box)
              }
              style={{
                position: "absolute",
                left: box.x,
                top: box.y,
                width: box.width,
                height: box.height,
                border: isSelected
                  ? "3px solid blue"
                  : "2px solid black",
                boxSizing: "border-box",
                background: "white",
                cursor: "move",
              }}
            />
          );
        })}

        {/* ARROWS */}
        {arrows.map((arrow) => {
          const length = Math.sqrt(
            Math.pow(arrow.x2 - arrow.x1, 2) +
              Math.pow(arrow.y2 - arrow.y1, 2)
          );

          const angle =
            (Math.atan2(
              arrow.y2 - arrow.y1,
              arrow.x2 - arrow.x1
            ) *
              180) /
            Math.PI;

          const isSelected =
            selectedObject?.type === "arrow" &&
            selectedObject?.id === arrow.id;

          return (
            <div
              key={arrow.id}
              onClick={(event) => {
                event.stopPropagation();

                setSelectedObject({
                  type: "arrow",
                  id: arrow.id,
                });
              }}
              style={{
                position: "absolute",
                left: arrow.x1,
                top: arrow.y1,
                width: length,
                height: "2px",
                background: isSelected ? "blue" : "black",
                transformOrigin: "0 50%",
                transform: `rotate(${angle}deg)`,
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  right: "-1px",
                  top: "-5px",
                  width: 0,
                  height: 0,
                  borderTop: "6px solid transparent",
                  borderBottom: "6px solid transparent",
                  borderLeft: isSelected
                    ? "10px solid blue"
                    : "10px solid black",
                }}
              />
            </div>
          );
        })}

        {/* TEXT */}
        {texts.map((item) => {
          const isSelected =
            selectedObject?.type === "text" &&
            selectedObject?.id === item.id;

          return (
            <div
              key={item.id}
              onMouseDown={(event) =>
                handleTextMouseDown(event, item)
              }
              style={{
                position: "absolute",
                left: item.x,
                top: item.y,
                fontSize: "18px",
                fontWeight: "500",
                color: "#000",
                userSelect: "none",
                cursor: "move",
                padding: "3px",
                border: isSelected
                  ? "2px dashed blue"
                  : "none",
              }}
            >
              {item.text}
            </div>
          );
        })}
      </div>

      {/* SELECTED OBJECT INFO */}
      <div style={{ marginTop: "10px" }}>
        {selectedObject ? (
          <p>
            Selected: <strong>{selectedObject.type}</strong>
          </p>
        ) : (
          <p>No object selected</p>
        )}
      </div>
    </div>
  );
}