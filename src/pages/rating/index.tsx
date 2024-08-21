import Head from "next/head";
import { IconStar } from "@tabler/icons-react";

import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Container, Flex, Text, Image, Button, Box } from "@mantine/core";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
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
            <Image
              radius="md"
              src="https://media.istockphoto.com/id/1269776313/photo/suburban-house.jpg?s=612x612&w=0&k=20&c=iNaSdrxJt7H37rjQZumXYScrmSTRm2fDJrqZzxpDL_k="
              w={"100%"}
              h={"100%"}
            />
          </Box>

          <Container size={400}>
            <Text ta="center" fz={14} fw={500}>
              "Please rate this image based on your preference. Your feedback
              helps us improve!"
            </Text>
          </Container>
          <Flex align="center" justify="center" gap={10}>
            {new Array(10).fill(0).map((d) => (
              <IconStar stroke={2} color="#C4C4C4" />
            ))}
          </Flex>

          <Container size={400} w="100%">
            <Button bg="#008625" c="#fff" fullWidth={true} w="100%" h={50}>
              Submit
            </Button>
          </Container>
        </Flex>
      </Container>
    </>
  );
}
