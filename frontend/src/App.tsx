import { Button, Text, Input, MantineProvider, Modal, TextInput } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import './App.css'
import { useDisclosure } from '@mantine/hooks'

const Tile = (props: { link: string, name: string }) => {
  return (
    <div className='my-4 group relative'>
      <img className='rounded-xl' src={props.link} />
      <div className='absolute rounded-xl top-0 opacity-0 
      bg-gray-800/50 group-hover:opacity-100 h-full w-full duration-300'>
        <Button variant='outline' radius={'xl'} color='red'
          className='absolute right-5 top-5'>
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

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Modal opened={opened} onClose={close} withCloseButton={false} centered>
        <Text fz={24}>Add a new photo</Text>
        <TextInput placeholder={"Suspendisse elit massa"} radius={"md"} my={20} label={"Label"} />
        <TextInput placeholder={"https://images.unsplash.com/photo-1584395630827-860eee694d7b?ixlib=r..."} radius={"md"} label={"Photo URL"} />
        <div className='ml-56 mt-4'>
          <Button variant="subtle" color='gray' onClick={close}>Cancel</Button>
          <Button variant='outline'>Submit</Button>
        </div>
      </Modal>
      <Header openModal={open} />
      <div className='flex mx-16'>
        <div className='mr-4 flex flex-col'>
          <Tile link={"/images/image1.jpg"} name='Icy Mountain' />
          <Tile link={"/images/image2.jpg"} name='Modern Bridge' />
          <Tile link={"/images/image5.jpg"} name='Beach House' />
        </div>
        <div className='mx-4 flex flex-col'>
          <Tile link={"/images/image4.jpg"} name='Scy Scraper' />
          <Tile link={"/images/image3.jpg"} name='Electric Car' />
          <Tile link={"/images/image6.jpg"} name='Desk' />
        </div>
        <div className='ml-4 flex flex-col'>
          <Tile link={"/images/image7.jpg"} name='Topology' />
          <Tile link={"/images/image8.jpg"} name='Beach' />
          <Tile link={"/images/image9.jpg"} name='Russian' />
        </div>
      </div>
    </MantineProvider>
  )
}

export default App
