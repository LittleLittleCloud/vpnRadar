import React from "react";
import { gql } from "apollo-boost";
import { Client } from "../graphQL";
import {
  ComposableMap,
  ZoomableGlobe,
  Geographies,
  Geography
} from "react-simple-maps";
import { Config } from "../config";
import Marker from "./marker";
const UpdateLogs = gql`
  query UpdateLogs {
    UpdatedLogs {
      location {
        X
        Y
      }
    }
  }
`;

async function GetUpdateLogs() {
  return await Client.query({
    query: UpdateLogs
  });
}

export class WorldMap extends React.Component {
  refresh() {
    const that = this;
    setInterval(async () => {
      const data = await GetUpdateLogs();
      that.setState({ data: data });
    }, 100);
  }
  componentDidMount() {
    this.refresh();
  }
  render() {
    return (
      <div className="Map">
        <ComposableMap
          projectionConfig={{
            scale: 205,
            rotation: [-11, 0, 0]
          }}
          width={980}
          height={551}
          style={{
            width: "100%",
            height: "auto"
          }}
        >
          <ZoomableGlobe>
            <Geographies geography={Config["world-map"]}>
              {(geographies, projection) => {
                return geographies.map((geography, i) => {
                  return (
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
                  );
                });
              }}
            </Geographies>
            <Marker />
          </ZoomableGlobe>
        </ComposableMap>
      </div>
    );
  }
}

export default WorldMap;
