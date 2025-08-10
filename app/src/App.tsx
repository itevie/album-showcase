import Page from "./dawn-ui/components/Page";
import Container from "./dawn-ui/components/Container";
import AppNavbar from "./Navbar";
import { useEffect, useState } from "react";
import { AxiosWrapper } from "./dawn-ui/util";
import Column from "./dawn-ui/components/Column";
import Words, { TextType } from "./dawn-ui/components/Words";
import Row from "./dawn-ui/components/Row";

export const BASE_URL = "http://localhost:3000";

export const axios = new AxiosWrapper();
axios.config.baseURL = BASE_URL;

export default function App() {
  const [images, setImages] = useState<Record<string, string[]>>({});

  useEffect(() => {
    (async () => {
      const images = await axios.get<Record<string, string[]>>("/api/images");
      setImages(images.data);
    })();
  }, []);

  return (
    <>
      <AppNavbar />
      <Page full>
        <Row util={["flex-wrap", "justify-center"]}>
          {Object.entries(images).map(([k, v]) => (
            <Container
              small
              hover
              onClick={() => (window.location.href = `/album/${k}`)}
            >
              <Column util={["align-center"]}>
                <img
                  src={`${BASE_URL}/api/image/${k}/${v[0]}`}
                  style={{ width: "300px" }}
                ></img>
                <Words type={TextType.Heading}>{k}</Words>
              </Column>
            </Container>
          ))}
        </Row>
      </Page>
    </>
  );
}
