import Head from "next/head";
import { IconStar } from "@tabler/icons-react";

import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import {
  Container,
  Flex,
  Text,
  Image,
  Button,
  Box,
  Checkbox,
  Radio,
  Group,
} from "@mantine/core";
import { useEffect, useState } from "react";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [value, setValue] = useState("");
  const [photo, setPhoto] = useState("");
  const [photoId, setPhotoId] = useState();
  const [loading, setLoading] = useState(false);

  const fetchImage = async () => {
    try {
      const { data: res } = await axios.get(
        "http://47.236.63.61:4050/image",
        {}
      );
      console.log(res);
      setPhoto(res.image.url);
      setPhotoId(res.image.id);
    } catch (error) {}
  };

  const handleSubmit = async () => {
    if (value.length < 1) {
      alert("Select a type to proceed");
      return;
    }

    setLoading(true);
    try {
      console.log(value);
      const { data: res } = await axios.patch(
        `http://47.236.63.61:4050/image/${photoId}`,
        { type: value }
      );
      setValue("");
      fetchImage();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <>
      <Container size={1200}>
        <Flex
          align="center"
          justify="center"
          mih="100vh"
          direction="column"
          gap={20}
        >
          <Box>
            <Image radius="md" src={photo} w={"100%"} h={"100%"} alt="image" />
          </Box>

          <Container size={400}>
            <Text ta="center" fz={14} fw={500}>
              Please rate this image based on your preference. Your feedback
              helps us improve!
            </Text>
          </Container>
          <Radio.Group name="selectType" value={value} onChange={setValue}>
            <Group mt="xs">
              <Radio value="indoor" label="Indoor" />
              <Radio value="outdoor" label="Outdoor" />
            </Group>
          </Radio.Group>

          <Container size={400} w="100%">
            <Button
              bg="#008625"
              c="#fff"
              fullWidth={true}
              w="100%"
              h={50}
              onClick={handleSubmit}
              loading={loading}
            >
              Submit
            </Button>
          </Container>
        </Flex>
      </Container>
    </>
  );
}
