import React from "react";
import { gql } from "apollo-boost";
import { Client } from "../graphQL";
import {
  ComposableMap,
  ZoomableGlobe,
  Geographies,
  Geography,
  Markers,
  MarkerType
} from "react-simple-maps";
import { Config } from "../config";
import Marker from "./marker";
import { updateExpression } from "@babel/types";

type Cord = {
  coordinates: [number, number];
  live: number;
};

const UpdateLogs = gql`
  {
    UpdatedLogs {
      src {
        location {
          X
          Y
        }
      }
    }
  }
`;

async function GetUpdateLogs() {
  return Client.query({
    query: UpdateLogs
  });
}

export class WorldMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cord: []
    };
    this.update();
  }
  async update() {
    this.state["cord"].map(x => (x.live -= 300));
    const data = await GetUpdateLogs();
    const pad: any[] = data["data"]["UpdatedLogs"];
    const newCords = pad.map(x => {
      const cord = {
        coordinates: [x["src"]["location"]["Y"], x["src"]["location"]["X"]],
        live: 1000
      } as Cord;
      return cord;
    });
    var cords: any[] = newCords.concat(this.state["cord"]);
    console.log(cords);
    cords = cords.filter(x => x["live"] > 0);
    this.setState({ cord: cords });
  }

  componentDidMount() {
    setInterval(() => this.update(), 1000);
  }

  render() {
    var currentData = this.state["cord"];
    return (
      <div className="Map">
        <ComposableMap
          width={980}
          height={551}
          style={{
            width: "100%",
            height: "auto"
          }}
        >
          <ZoomableGlobe disablePanning>
            <Geographies geography={Config["world-map"]}>
              {(geographies, projection) => {
                var china = geographies.filter(
                  (geo, i) => (geo as any).id !== "ATA"
                );
                return china.map((geography, i) => (
                  <Geography
                    key={i}
                    geography={geography}
                    projection={projection}
                    style={{
                      default: {
                        fill: "#ECEFF1",
                        stroke: "#607D8B",
                        strokeWidth: 0.75,
                        outline: "none"
                      },
                      hover: {
                        fill: "#607D8B",
                        stroke: "#607D8B",
                        strokeWidth: 0.75,
                        outline: "none"
                      },
                      pressed: {
                        fill: "#FF5722",
                        stroke: "#607D8B",
                        strokeWidth: 0.75,
                        outline: "none"
                      }
                    }}
                  />
                ));
              }}
            </Geographies>
            <Markers>
              {currentData.map((marker, i) => (
                <Marker
                  key={i}
                  marker={marker}
                  style={{
                    default: { stroke: "#455A64" },
                    hover: { stroke: "#FF5722" },
                    pressed: { stroke: "#FF5722" }
                  }}
                >
                  <g transform="translate(-12, -24)">
                    <path
                      fill="none"
                      strokeWidth="2"
                      strokeLinecap="square"
                      strokeMiterlimit="10"
                      strokeLinejoin="miter"
                      d="M20,9c0,4.9-8,13-8,13S4,13.9,4,9c0-5.1,4.1-8,8-8S20,3.9,20,9z"
                    />
                    <circle
                      fill="none"
                      strokeWidth="2"
                      strokeLinecap="square"
                      strokeMiterlimit="10"
                      strokeLinejoin="miter"
                      cx="12"
                      cy="9"
                      r="3"
                    />
                  </g>
                </Marker>
              ))}
            </Markers>
          </ZoomableGlobe>
        </ComposableMap>
      </div>
    );
  }
}

export default WorldMap;
