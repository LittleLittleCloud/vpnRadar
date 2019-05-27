import React, { Component } from "react";
import { Client } from "../graphQL";
import { gql } from "apollo-boost";
import { Markers, Marker } from "react-simple-maps";
const UpdateLogs = gql`
  query UpdateLogs {
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
  return await Client.query({
    query: UpdateLogs
  });
}

type Cord = {
  coordinates: [number, number];
  live: number;
};
export class ReactMarker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cord: []
    };
  }

  async update() {
    //
    this.state["cord"].map(x => (x.live -= 10));
    const data = await GetUpdateLogs();
    const pad: any[] = data["data"]["UpdateLogs"];
    const newCords = pad.map(x => {
      return {
        coordinates: [x["src"]["location"]["X"], x["src"]["location"]["Y"]],
        live: 1000
      } as Cord;
    });
    this.setState({ cord: this.state["cord"] + newCords });
  }

  componentDidMount() {
    setInterval(() => this.update, 100);
  }

  render() {
    const currentData: Cord[] = this.state["data"];
    return (
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
          />
        ))}
      </Markers>
    );
  }
}

export default Marker;
