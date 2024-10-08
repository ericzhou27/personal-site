import * as THREE from "three";
import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Html,
  Environment,
  useGLTF,
  ContactShadows,
  OrbitControls,
} from "@react-three/drei";
import "./App.css";
import ReactTerminal from "react-terminal-component";
import {
  EmulatorState,
  OutputFactory,
  FileSystem,
  Outputs,
} from "javascript-terminal";
import YouTube from "react-youtube";

import {
  resume,
  hobbies,
  electify,
  portals,
  musea,
  ruma,
  wysj,
  lightboard,
  help,
} from "./constants/strings";

function Model(props) {
  const group = useRef();
  const terminal = useRef();
  const [quitAutocorrect, setQuitAutocorrect] = useState(0);
  const [showSecret, setShowSecret] = useState(false);
  const { nodes, materials } = useGLTF("/mac-draco.glb");
  const opts = {
    height: "216",
    width: "334",
    playerVars: {
      autoplay: 1,
    },
  };

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      Math.cos(t / 2) / 10 + 0.25,
      0.1
    );
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      Math.sin(t / 4) / 10,
      0.1
    );
    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      Math.sin(t / 4) / 20,
      0.1
    );
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      (-5 + Math.sin(t)) / 5,
      0.1
    );

    if (quitAutocorrect < 10) {
      const inputs = window.document.querySelectorAll("input");
      inputs.forEach((input) => {
        input.setAttribute("autocomplete", "off");
        input.setAttribute("autocorrect", "off");
        input.setAttribute("autocapitalize", "off");
        input.setAttribute("spellcheck", false);
      });
      setQuitAutocorrect(quitAutocorrect + 1);
    }

    try {
      if (!showSecret && terminal.current.state.inputStr === "cd secret") {
        setShowSecret(true);
      }
    } catch (error) {
      console.error(error);
    }
  });

  const customState = EmulatorState.create({
    fs: FileSystem.create({
      "/RESUME.txt": {
        content: resume,
      },
      "/HOBBIES.txt": {
        content: hobbies,
      },
      "/HELP.txt": {
        content: help,
      },
      "/secret": {},
      "/projects": {},
      "/projects/WYSJ.txt": { content: wysj },
      "/projects/PORTALS.txt": { content: portals },
      "/projects/ELECTIFY.txt": { content: electify },
    }),
  });

  const defaultState = EmulatorState.createEmpty();
  const defaultOutputs = defaultState.getOutputs();

  const newOutputs = Outputs.addRecord(
    defaultOutputs,
    OutputFactory.makeTextOutput(
      `--------------------\n✨ CLICK ME I WORK ✨\n--------------------`
    )
  );
  const emulatorState = customState.setOutputs(newOutputs);

  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation-x={-0.425} position={[0, -0.04, 0.41]}>
        <group position={[0, 2.96, -0.13]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            material={materials.aluminium}
            geometry={nodes["Cube008"].geometry}
          />
          <mesh
            material={materials["matte.001"]}
            geometry={nodes["Cube008_1"].geometry}
          />
          <mesh geometry={nodes["Cube008_2"].geometry}>
            <Html
              className="content"
              rotation-x={-Math.PI / 2}
              position={[0, 0.05, -0.09]}
              transform
              occlude
            >
              <div className="wrapper">
                {showSecret ? (
                  <YouTube videoId="dQw4w9WgXcQ" opts={opts} />
                ) : (
                  <ReactTerminal
                    ref={terminal}
                    inputStr="cat HELP.txt"
                    clickToFocus={true}
                    emulatorState={emulatorState}
                    promptSymbol="ericzhou@myth64:~$ "
                    theme={{
                      background: "#141313",
                      promptSymbolColor: "#66FF00",
                      commandColor: "#fff",
                      outputColor: "#fff",
                      errorOutputColor: "#ff89bd",
                      fontSize: "0.85rem",
                      spacing: "1%",
                      fontFamily: "monospace",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                )}
              </div>
            </Html>
          </mesh>
        </group>
      </group>
      <mesh
        material={materials.keys}
        geometry={nodes.keyboard.geometry}
        position={[1.79, 0, 3.45]}
      />
      <group position={[0, -0.1, 3.39]}>
        <mesh
          material={materials.aluminium}
          geometry={nodes["Cube002"].geometry}
        />
        <mesh
          material={materials.trackpad}
          geometry={nodes["Cube002_1"].geometry}
        />
      </group>
      <mesh
        material={materials.touchbar}
        geometry={nodes.touchbar.geometry}
        position={[0, -0.03, 1.2]}
      />
    </group>
  );
}

function checkIfMobile() {
  let check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showBlur: false,
      isMobile: false,
    };

    this.splashContainer = React.createRef();
    this.sectionOne = React.createRef();
    this.sectionTwo = React.createRef();
    this.sectionThree = React.createRef();
    this.sectionFour = React.createRef();
    this.sectionFive = React.createRef();

    this.scrollTo = this.scrollTo.bind(this);
  }

  componentDidMount() {
    let isMobile = checkIfMobile();
    this.setState({
      isMobile: isMobile,
    });
  }

  scrollTo(index) {
    const h = this.splashContainer.current.clientHeight;
    window.document.body.scrollTo({
      top: h * index,
      behavior: "smooth",
    });
  }

  render() {
    return (
      <>
        <div class="pageWrapper">
          <div
            class="splashContainer"
            id="sectionOne"
            ref={this.splashContainer}
          >
            <div
              class={
                this.state.isMobile ? "mobileModelWrapper" : "modelWrapper"
              }
            >
              <Canvas
                dpr={[1, 2]}
                camera={{ position: [-10, 0, -25], fov: 35 }}
              >
                <pointLight position={[10, 10, 10]} intensity={1.5} />
                <Suspense fallback={null}>
                  <group
                    rotation={[0, Math.PI, 0]}
                    scale={
                      new THREE.Vector3(
                        Math.min(1, window.innerWidth / 800),
                        Math.min(1, window.innerWidth / 800),
                        Math.min(1, window.innerWidth / 800)
                      )
                    }
                  >
                    <Model />
                  </group>
                  <Environment preset="city" />
                </Suspense>
                <ContactShadows
                  rotation-x={Math.PI / 2}
                  position={[0, -4.5, 0]}
                  opacity={1}
                  width={20}
                  height={20}
                  blur={2}
                  far={4.5}
                />
                <OrbitControls
                  enablePan={false}
                  enableZoom={false}
                  minPolarAngle={Math.PI / 2}
                  maxPolarAngle={Math.PI / 2}
                />
              </Canvas>
            </div>
            {!this.state.isMobile && <div class="pad" />}
            <div
              class={
                this.state.isMobile ? "titleWrapperMobile" : "titleWrapper"
              }
            >
              <p class="titleText">Eric Zhou</p>
              <p class="miniText">Andreessen Horowitz | Stanford | ZFellows </p>
            </div>
          </div>
        </div>
      </>
    );
  }
}
