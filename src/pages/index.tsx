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
  LoadingOverlay,
} from "@mantine/core";
import { useEffect, useState } from "react";
import axios, { isAxiosError } from "axios";
import useNotification from "@/lib/hooks/useNotification";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [value, setValue] = useState("");
  const [photo, setPhoto] = useState("");
  const [photoId, setPhotoId] = useState();
  const [disable, setDisable] = useState(false);
  const [visible, setVisible] = useState(false);
  const { handleError, handleSuccess, handleInfo } = useNotification();

  const fetchImage = async () => {
    try {
      const { data: res } = await axios.get(
        "http://47.236.63.61:4050/image",
        {}
      );
      setPhoto(res.image.url);
      setPhotoId(res.image.id);
    } catch (error) {}
  };

  const handleSubmit = async () => {
    if (value.length < 1) {
      handleInfo("No input", "Select a type to proceed");
      return;
    }

    setDisable(true);
    setVisible(true);
    try {
      const { data: res } = await axios.patch(
        `http://47.236.63.61:4050/image/${photoId}`,
        { type: value }
      );
      handleSuccess("Succesfully Submitted", "Image has been Updated");
      setValue("");
      fetchImage();
    } catch (error) {
      if (isAxiosError(error))
        return handleError("Login failed", error.response?.data.message);
      return handleError("Error", "An error occurred");
    } finally {
      setDisable(false);
      setVisible(false);
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
          <Box w={"400px"} h={"400px"} pos={"relative"}>
            <LoadingOverlay
              w={"100%"}
              visible={visible}
              zIndex={1000}
              overlayProps={{ radius: "sm", blur: 2 }}
            />
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
              disabled={disable}
            >
              Submit
            </Button>
          </Container>
        </Flex>
      </Container>
    </>
  );
}
