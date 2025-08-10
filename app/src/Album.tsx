import { useState, useEffect } from "react";
import { axios, BASE_URL } from "./App";
import Column from "./dawn-ui/components/Column";
import Container from "./dawn-ui/components/Container";
import Page from "./dawn-ui/components/Page";
import Words, { TextType } from "./dawn-ui/components/Words";
import AppNavbar from "./Navbar";
import Row from "./dawn-ui/components/Row";

export default function Album() {
  const [images, setImages] = useState<string[]>([]);
  const album = window.location.pathname.match(/\/album\/(.+)/)?.[1]!;

  useEffect(() => {
    (async () => {
      const images = await axios.get<string[]>("/api/album/" + album);
      setImages(images.data);
    })();
  }, []);

  return (
    <>
      <AppNavbar />
      <Page full>
        <Row util={["flex-wrap", "justify-center"]}>
          {images.map((v) => (
            <Container
              small
              hover
              onClick={() =>
                (window.location.href = `/album/${album}/image/${v}`)
              }
            >
              <Column util={["align-center"]}>
                <img
                  src={`${BASE_URL}/api/image/${album}/${v}`}
                  style={{
                    width: "300px",
                    height: "200px",
                    objectFit: "contain",
                  }}
                ></img>
                <Words type={TextType.Heading}>{v}</Words>
              </Column>
            </Container>
          ))}
        </Row>
      </Page>
    </>
  );
}
