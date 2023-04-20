import { useState, useRef, useEffect } from 'react'
import './App.css'
import { Divider } from '@mantine/core';
import { TextInput, Slider, RangeSlider } from '@mantine/core';
import { Button, Card, Text, Group, FileButton, BackgroundImage, Image as MantineImage } from '@mantine/core';
import { Container, Grid, SimpleGrid, Skeleton, useMantineTheme, rem } from '@mantine/core';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Checkbox, NumberInput } from '@mantine/core';
import CroppedImage from './components/CroppedImage';

import TintedImage from './components/TintedImage';

const PRIMARY_COL_HEIGHT = rem(500);

const defaultBlob = new Blob(['default text'], { type: 'text/plain' });
const defaultBlobUrl = URL.createObjectURL(defaultBlob);

function App() {

  //['#ff3131', '#ff5757', '#ff66c4', '#cb6ce6', '#8c52ff', '#5e17eb', '#0097b2', '#0cc0df', '#5ce1e6', '#38b6ff', '#5271ff', '#004aad', '#00bf63', '#7ed975', '#c1ff72', '#ffde59', '#ffbd59', '#ff914d']
  const [file, setFile] = useState<File | null>(null);
  const [bgColor, setBgColor] = useState("#000000")
  const [txtColor, setTxtColor] = useState("#a6a6a6")
  const [fontSize, setFontSize] = useState<number>(100)
  const [opacity, setOpacity] = useState<number>(60)
  const [header, setHeader] = useState<string>("Header")
  const [imageUrl, setImageUrl] = useState<string>("")
  const [croppedImageUrl, setCroppedImageUrl] = useState<string>("")
  const theme = useMantineTheme();
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - ${theme.spacing.md} / 2)`;

  function setTint(event: React.MouseEvent<HTMLButtonElement>) {
    let colorTint = event.currentTarget.id
    setBgColor(colorTint)
  }

  function setFontColor(event: React.MouseEvent<HTMLButtonElement>) {
    let txtTint = event.currentTarget.id
    setTxtColor(txtTint)
  }

  function handleTextChange(newText: any) {
    setHeader(newText.currentTarget.value);
  };

  const handleDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length) {
      setFile(acceptedFiles[0]);
    }
  };

  return (
    <div className="App">
      <Container my="md">
        <SimpleGrid cols={1} spacing="md" breakpoints={[{ maxWidth: 'lg', cols: 1 }]}>
          <Grid gutter="md">
            <Grid.Col>
              <Card radius="md" h='100%'>
                <Group>
                  <Dropzone
                    onDrop={handleDrop}
                    onReject={(files) => console.log('rejected files', files)}
                    maxSize={3 * 1024 ** 2}
                    accept={IMAGE_MIME_TYPE}
                  >
                    <Group position="center" spacing="xl" style={{ minHeight: rem(220), pointerEvents: 'none' }}>
                      <Dropzone.Accept>
                        <IconUpload
                          size="3.2rem"
                          stroke={1.5}
                          color={theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]}
                        />
                      </Dropzone.Accept>
                      <Dropzone.Reject>
                        <IconX
                          size="3.2rem"
                          stroke={1.5}
                          color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
                        />
                      </Dropzone.Reject>
                      <Dropzone.Idle>
                        <IconPhoto size="3.2rem" stroke={1.5} />
                      </Dropzone.Idle>

                      <div>
                        <Text size="xl" inline>
                          Drag images here or click to select files
                        </Text>
                        <Text size="sm" color="dimmed" inline mt={7}>
                          Each file should not exceed 5mb
                        </Text>
                      </div>
                    </Group>
                  </Dropzone>
                  <Divider orientation="vertical" />
                  {file && (
                    <Card sx={{ height: "100%" }}>
                      <TintedImage onImageUrlLoad={setImageUrl} imageUrl={URL.createObjectURL(file)} bgColor={bgColor} tintOpacity={opacity / 100} />
                      <CroppedImage txtColor={txtColor} headerText={header} fontSize={fontSize} imageUrl={imageUrl} setImageUrl={setCroppedImageUrl} width={1280} height={720} />
                      <MantineImage src={croppedImageUrl} id='image' />
                    </Card>
                  )}
                </Group>
              </Card>
            </Grid.Col>
            <Grid.Col span={6}>
              <Card radius="md" h='100%'>

                <div className='bg-color buttons'>
                  <Text  weight={1000} sx={{ marginBottom: '5%' }}>Background Opacity Color:</Text>
                  <Slider defaultValue={60} onChange={setOpacity} sx={{ marginBottom: '11%' }} />
                  <Button id='#000000' onClick={setTint} color="Black"></Button>
                  <Button id='#545454' onClick={setTint} color="Dark Gray"></Button>
                  <Button id='#737373' onClick={setTint} color="Gray"></Button>
                  <Button id='#a6a6a6' onClick={setTint} color="Light Gray"></Button>
                  <Button id='#d9d9d9' onClick={setTint} color="Lighter Gray"></Button>
                  <Button id='#ffffff' onClick={setTint} color="White"></Button><br />
                  <Button id='#ff3131' onClick={setTint} color="Bright Red"></Button>
                  <Button id='#ff5757' onClick={setTint} color="Coral Red"></Button>
                  <Button id='#ff66c4' onClick={setTint} color="Pink"></Button>
                  <Button id='#cb6ce6' onClick={setTint} color="Magenta"></Button>
                  <Button id='#8c52ff' onClick={setTint} color="Purple"></Button>
                  <Button id='#5e17eb' onClick={setTint} color="Violet"></Button><br />
                  <Button id='#0097b2' onClick={setTint} color="Dark-Turquoise"></Button>
                  <Button id='#0cc0df' onClick={setTint} color="Aqua-Blue"></Button>
                  <Button id='#5ce1e6' onClick={setTint} color="Turquoise-Blue"></Button>
                  <Button id='#38b6ff' onClick={setTint} color="Light-Blue"></Button>
                  <Button id='#5271ff' onClick={setTint} color="Royal-Blue"></Button>
                  <Button id='#004aad' onClick={setTint} color="Cobalt-Blue"></Button><br />
                  <Button id='#00bf63' onClick={setTint} color="Green"></Button>
                  <Button id='#7ed975' onClick={setTint} color="Grass-Green"></Button>
                  <Button id='#c1ff72' onClick={setTint} color="Lime"></Button>
                  <Button id='#ffde59' onClick={setTint} color="Yellow"></Button>
                  <Button id='#ffbd59' onClick={setTint} color="Peach"></Button>
                  <Button id='#ff914d' onClick={setTint} color="Orange"></Button>
                </div>
              </Card>
            </Grid.Col>
            <Grid.Col span={6}>
              <Card radius="md" h='100%'>
                <div className='txt-color buttons'>
                  <Text weight={1000} sx={{ marginBottom: '5%' }}>Text Controls:</Text>
                  <TextInput
                    onChange={handleTextChange}
                    radius="md"
                    placeholder='Enter Header'
                    size="md"
                    withAsterisk
                    sx={{ marginBottom: '5%' }}
                  />
                  <Button id='#000000' onClick={setFontColor} color="Black"></Button>
                  <Button id='#545454' onClick={setFontColor} color="Dark Gray"></Button>
                  <Button id='#737373' onClick={setFontColor} color="Gray"></Button>
                  <Button id='#a6a6a6' onClick={setFontColor} color="Light Gray"></Button>
                  <Button id='#d9d9d9' onClick={setFontColor} color="Lighter Gray"></Button>
                  <Button id='#ffffff' onClick={setFontColor} color="White"></Button> <br />
                  <Button id='#ff3131' onClick={setFontColor} color="Bright Red"></Button>
                  <Button id='#ff5757' onClick={setFontColor} color="Coral Red"></Button>
                  <Button id='#ff66c4' onClick={setFontColor} color="Pink"></Button>
                  <Button id='#cb6ce6' onClick={setFontColor} color="Magenta"></Button>
                  <Button id='#8c52ff' onClick={setFontColor} color="Purple"></Button>
                  <Button id='#5e17eb' onClick={setFontColor} color="Violet"></Button><br />
                  <Button id='#0097b2' onClick={setFontColor} color="Dark-Turquoise"></Button>
                  <Button id='#0cc0df' onClick={setFontColor} color="Aqua-Blue"></Button>
                  <Button id='#5ce1e6' onClick={setFontColor} color="Turquoise-Blue"></Button>
                  <Button id='#38b6ff' onClick={setFontColor} color="Light-Blue"></Button>
                  <Button id='#5271ff' onClick={setFontColor} color="Royal-Blue"></Button>
                  <Button id='#004aad' onClick={setFontColor} color="Cobalt-Blue"></Button><br />
                  <Button id='#00bf63' onClick={setFontColor} color="Green"></Button>
                  <Button id='#7ed975' onClick={setFontColor} color="Grass-Green"></Button>
                  <Button id='#c1ff72' onClick={setFontColor} color="Lime"></Button>
                  <Button id='#ffde59' onClick={setFontColor} color="Yellow"></Button>
                  <Button id='#ffbd59' onClick={setFontColor} color="Peach"></Button>
                  <Button id='#ff914d' onClick={setFontColor} color="Orange"></Button>
                  <Slider defaultValue={100} onChange={setFontSize} sx={{ marginTop: '5%' }} />
                  {/* <Checkbox checked sx={{ marginTop: "5%" }} label="Add text shadow to header" /> */}
                  {/* <NumberInput
                    onChange={setImageHeight}
                    radius="md"
                    placeholder='Enter Header'
                    size="md"
                    withAsterisk
                    sx={{ marginBottom: '5%' }}
                  />
                  <NumberInput
                    onChange={setImageWidth}
                    radius="md"
                    placeholder='Enter Header'
                    size="md"
                    withAsterisk
                    sx={{ marginBottom: '5%' }}
                  /> */}

                </div>
              </Card>
            </Grid.Col>
          </Grid>
        </SimpleGrid>
      </Container>
    </div>
  )
}

export default App
