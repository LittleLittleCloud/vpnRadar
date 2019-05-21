import React from 'react';
import { } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Client } from '../graphQL';
import { ComposableMap, ZoomableGlobe, Geographies, Geography } from 'react-simple-maps';
import { Config } from '../config';

const wrapperStyles = {
    width: "100%",
    maxWidth: 980,
    margin: "0 auto",
}

const UpdateLogs = gql`
query UpdateLogs {
    UpdatedLogs {
      location {
          X
          Y
      }
    }
  }
`

async function GetUpdateLogs() {
    return await Client.query({
        query: UpdateLogs
    })
}

export class Map extends React.Component {
    refresh() {
        const that = this;
        setInterval(async () => {
            const data = await GetUpdateLogs();
            that.setState({ data: data })
        }, 100)
    }
    render() {
        return (
            <div style={wrapperStyles}>
                <ComposableMap>
                    <ZoomableGlobe>
                        <Geographies geography={Config["world-map"]}>
                            {
                                (geographies, projection) => {
                                    geographies.map((geography, i) => {
                                        (
                                            <Geography key={i} geography={geography} projection={projection} />
                                        )
                                    })

                                }
                            }

                        </Geographies>
                    </ZoomableGlobe>
                </ComposableMap>
            </div>
        )
    }
}

export default Map;