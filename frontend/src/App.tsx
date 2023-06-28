import { Button, Text, Input, MantineProvider, Modal, TextInput } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import './App.css'
import { useDisclosure } from '@mantine/hooks'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Tile = (props: { link: string, name: string, Delete: (link: string) => void }) => {

  return (
    <div className='my-4 group relative'>
      <img className='rounded-xl' src={props.link} />
      <div className='absolute rounded-xl top-0 opacity-0 
      bg-gray-800/50 group-hover:opacity-100 h-full w-full duration-300'>
        <Button variant='outline' radius={'xl'} color='red'
          className='absolute right-5 top-5' onClick={() => props.Delete(props.link)}>
          delete
        </Button>
        <div className='text-white absolute ml-8 font-bold bottom-8 text-3xl'>
          {props.name}
        </div>
      </div>
    </div>
  )
}

const Header = (props: { openModal: () => void }) => {
  return (<div className='flex my-10 mx-20'>
    <img src="/my_unsplash_logo.svg" className='h-8' />
    <Input placeholder='Search by name' size='md' icon={<IconSearch />} className='mx-auto' radius={"xl"} w={600} />
    <Button onClick={props.openModal} variant='outline' size='md' color='green' className='ml-auto'>Add a photo</Button>
  </div>)
}

function App() {
  const [opened, { open, close }] = useDisclosure(false);
  const [label, setlabel] = useState("");
  const [link, setlink] = useState("");
  const [imageList, setImageList] = useState<{ name: string; link: string }[]>([])
  const [leftImages, setLeftImages] = useState<{ name: string; link: string }[]>([]);
  const [middleImages, setMiddleImages] = useState<{ name: string; link: string }[]>([]);
  const [rightImages, setRightImages] = useState<{ name: string; link: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const baseURL = "http://localhost:8080"

  const Delete = async (link: string) => {
    await axios.delete(link);
    getData();
  }

  const addImage = async (title: string, link: string) => {
    setLoading(true);
    let bodyFormData = new FormData();
    bodyFormData.append('title', title);
    bodyFormData.append('link', link);
    try {
      let res = await axios({
        method: "post",
        url: baseURL + "/image",
        data: bodyFormData, headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      console.log(res);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
    setlabel(""); setlink("");
    getData(); close()
  }

  const getData = () => {
    axios.get(baseURL + "/directory").then((res) => {
      let directory: { name: string; link: string }[] = [];
      // @ts-ignore
      res.data.forEach(e => directory.push({ name: e.title, link: baseURL + "/image/" + e.id }));
      setImageList(directory);
      console.log(res);
    })
  }

  useEffect(() => {
    getData();
  }, [])

  useEffect(() => {
    const totalLength = imageList.length;
    const partSize = Math.floor(totalLength / 3);
    const remainder = totalLength % 3;
    setLeftImages(imageList.slice(0, partSize + Math.ceil(remainder / 2)));
    setMiddleImages(imageList.slice(partSize + Math.ceil(remainder / 2), partSize * 2 + remainder));
    setRightImages(imageList.slice(partSize * 2 + remainder));
  }, [imageList])

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Modal opened={opened} onClose={close} withCloseButton={false} centered>
        <Text fz={24}>Add a new photo</Text>

        <TextInput value={label} onChange={e => setlabel(e.currentTarget.value)}
          placeholder={"Suspendisse elit massa"} radius={"md"} my={20} label={"Label"} />
        <TextInput value={link} onChange={e => setlink(e.currentTarget.value)}
          placeholder={"https://images.unsplash.com/photo-1584395630827-860eee694d7b?ixlib=r..."}
          radius={"md"} label={"Photo URL"} />

        <div className='ml-52 mt-4'>
          <Button variant="subtle" color='gray' onClick={close}>Cancel</Button>
          <Button variant='outline' onClick={() => addImage(label, link)} loading={loading}>Submit</Button>
        </div>
      </Modal>

      <Header openModal={open} />

      <div className='flex mx-16'>
        <div className='mr-4 flex flex-col w-[30%]'>
          {leftImages.map((v) => <Tile link={v.link} name={v.name} key={v.link} Delete={Delete} />)}
        </div>
        <div className='mx-4 flex flex-col w-[30%]'>
          {middleImages.map((v) => <Tile link={v.link} name={v.name} key={v.link} Delete={Delete} />)}
        </div>
        <div className='ml-4 flex flex-col w-[30%]'>
          {rightImages.map((v) => <Tile link={v.link} name={v.name} key={v.link} Delete={Delete} />)}
        </div>
      </div>

    </MantineProvider>
  )
}

export default App
