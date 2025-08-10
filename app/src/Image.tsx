import { useState } from "react";
import { BASE_URL } from "./App";
import Container from "./dawn-ui/components/Container";
import Page from "./dawn-ui/components/Page";
import Row from "./dawn-ui/components/Row";
import AppNavbar from "./Navbar";
import exifr from "exifr";
import Column from "./dawn-ui/components/Column";
import Words from "./dawn-ui/components/Words";

const importantExif = [
  "CreateDate",
  "Make",
  "Model",
  "ISO",
  "FNumber",
  "ExposureTime",
];

export default function Image() {
  const parts = window.location.href.match(/\/album\/([^/]+)\/image\/(.+)/)!;
  const [exif, setExif] = useState<{ [key: string]: any }>({});
  const [exifExpanded, setExifExpanded] = useState<boolean>(false);

  async function loadExif(image: HTMLImageElement) {
    const result = await exifr.parse(image);
    setExif(result);
  }

  return (
    <div style={{ height: "100vh" }}>
      <AppNavbar />
      <Page full>
        <Row style={{ height: "88vh" }}>
          <img
            src={`${BASE_URL}/api/image/${parts[1]}/${parts[2]}`}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
              flex: "1",
            }}
            onLoad={(i) => {
              loadExif(i.target as HTMLImageElement);
            }}
          />
          <Container
            style={{ minWidth: "100px", width: "300px" }}
            util={["overflow-y-scroll"]}
          >
            <Column>
              {importantExif.map((x) => (
                <label>
                  <b>{x}</b>: {exif[x]?.toString()}
                </label>
              ))}
              <Words
                util={["clickable"]}
                style={{ textDecoration: "underline" }}
                onClick={() => setExifExpanded(!exifExpanded)}
              >
                {exifExpanded ? "Hide" : "Show"} More Data
              </Words>
              {exifExpanded &&
                Object.keys(exif)
                  .filter((x) => !importantExif.includes(x) && !!exif[x])
                  .map((x) => (
                    <label>
                      <b>{x}</b>: {exif[x]?.toString()}
                    </label>
                  ))}
            </Column>
          </Container>
        </Row>
      </Page>
    </div>
  );
}
