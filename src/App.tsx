import React from "react";
import { SketchPicker } from "react-color";
import { useDropzone } from "react-dropzone";
import SVG from "react-inlinesvg";

import { Button, Form, Overlay } from "react-bootstrap";

import logo from "./logo.svg";
import "./App.css";

function App() {
  const [url, setURL] = React.useState(logo);
  const [color, setColor] = React.useState("black");

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        setURL(reader.result as string);
      },
      false
    );

    if (acceptedFiles[0]) {
      reader.readAsDataURL(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const handleURLChanged = (event: any) => {
    setURL(event.target.value);
  };

  const handleColorChanged = (change: any) => {
    setColor(change);
  };

  return (
    <div
      className="App d-flex"
      style={{ position: "absolute", left: 0, top: 0, right: 0, bottom: 0 }}
    >
      <div className="d-flex flex-column flex-grow-1 m-3">
        <div className="mb-2">Original</div>
        <div
          {...getRootProps({
            className: "d-flex align-items-center justify-content-center p-3",
            style: { minHeight: 32 },
          })}
        >
          <input {...getInputProps()} />
          <div className="px-5 py-4 white-background">
            <SVG
              className="checked-background"
              src={url}
              width="16rem"
              height="16rem"
            />
          </div>
        </div>
        <div className="d-flex flex-column mt-3">
          <Form>
            <Form.Group controlId="formURL">
              <Form.Label>URL</Form.Label>
              <Form.Control value={url} onChange={handleURLChanged} />
            </Form.Group>
          </Form>
          <div className="my-3">
            <ColorPickerButton
              color={color}
              onColorChange={handleColorChanged}
            />
          </div>
        </div>
        <div className="d-flex flex-column">
          <div className="d-flex align-items-end m-1">
            <StyledSVG src={url} size="16" color={color} />
            <StyledSVG src={url} size="24" color={color} />
            <StyledSVG src={url} size="32" color={color} />
            <StyledSVG src={url} size="64" color={color} />
            <StyledSVG src={url} size="128" color={color} />
            <StyledSVG src={url} size="256" color={color} />
          </div>
          <div className="d-flex align-items-end m-1">
            <StyledSVG className="white-background thick-frame" src={url} size="128" color="black" />
            <StyledSVG className="light-background thick-frame" src={url} size="128" color="black" />
            <StyledSVG className="dark-background thick-frame" src={url} size="128" color="white" />
            <StyledSVG className="black-background thick-frame" src={url} size="128" color="white" />
          </div>
        </div>
      </div>
    </div>
  );
}

const StyledSVG: React.FC<any> = ({ className, color, src, size }) => {
  return (
    <SVG
      className={`mx-1 ${className}`}
      src={src}
      width={size}
      height={size}
      fill={color}
      stroke={color}
    />
  );
};

const ColorPickerButton: React.FC<any> = ({ color, onColorChange }) => {
  const [show, setShow] = React.useState(false);
  const target = React.useRef<HTMLButtonElement>(null);

  const handleButtonClick = () => {
    setShow(!show);
  };

  const handleColorChanged = (change: any) => {
    onColorChange(change.hex);
  };

  return (
    <>
      <Button
        variant="outline-secondary"
        ref={target}
        onClick={handleButtonClick}
      >
        <div className="d-flex align-items-center justify-content-center">
          <div
            style={{
              display: "inline-block",
              width: "1rem",
              height: "1rem",
              backgroundColor: color,
            }}
          />
          <span className="mx-1">Color</span>
        </div>
      </Button>
      <Overlay target={target.current} show={show} placement="bottom">
        {({ placement, arrowProps, show: _show, popper, ...props }) => (
          <div {...props}>
            <div>
              <SketchPicker
                color={color}
                disableAlpha={true}
                onChange={handleColorChanged}
              />
            </div>
          </div>
        )}
      </Overlay>
    </>
  );
};
export default App;
