import { Button, Flex, Text } from "@radix-ui/themes";

export default function Home() {
  return (
    <Flex direction="column" gap="2" width="100px">
      <Text>Hello from Radix Themes :)</Text>
      <Button>Let's go</Button>
    </Flex>
  );
}
