'use client'
import {
    Button,
    Card,
    Checkbox,
    FileType,
    Input,
    InputFile,
    List,
    ListItem,
    Menu,
    MenuItem,
    Progress,
    Radio,
    Table,
    TableBodyRow,
    TableDataCell,
    TableHeaderCell,
    TextArea,
    Toggle
} from '@/shared';
import {Header} from '@/widgets/Header';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
    return (
        <>
            <Header>
                <Link href='/' className='flex items-center gap-6'>
                    <Image src='/logo.svg' alt='Radium' width={48} height={48}/>
                    <h1 className='font-mono text-4xl font-bold text-accent-primary-200'>
                        Радиум
                    </h1>
                </Link>
            </Header>
            <main className='flex flex-col m-10'>
                <div className='flex gap-7 w-full'>
                    <Button key={1} className='w-full' color='accent'>Button</Button>
                    <Button key={2} className='w-full' color='destructive'>Button</Button>
                    <Button key={3} className='w-full' color='outlined'>Button</Button>
                </div>
                <br></br>
                <Card>
                    <header className='flex w-full items-center gap-4'>
                        <h1 className='font-mono text-xl font-bold leading-[normal] text-primary-default'>
                            Карточка
                        </h1>
                    </header>
                </Card>
                <br></br>
                <Checkbox name={''} value={''}>CheckBox</Checkbox>
                <br></br>
                <Radio name={''} value={''}>Radio</Radio>
                <br></br>
                <Input>Input</Input>
                <br></br>
                <InputFile allowedFileTypes={FileType.zip} onFileLoaded={() => {
                }}></InputFile>
                <br></br>
                <List>
                    <ListItem key={1} href={''}>ListItem1</ListItem>
                    <ListItem key={2} href={''}>ListItem2</ListItem>
                    <ListItem key={3} href={''}>ListItem3</ListItem>
                </List>
                <br></br>
                <Menu>
                    <MenuItem key={1} onClick={() => {
                    }} icon='profile'>
                        MenuItem1
                    </MenuItem>
                    <MenuItem key={2} icon='courses'>MenuItem2</MenuItem>
                    <MenuItem key={3} icon='group'>MenuItem3</MenuItem>
                    <MenuItem key={4} onClick={() => {
                    }} icon='exit'>
                        MenuItem3
                    </MenuItem>
                </Menu>
                <br></br>
                <Progress theme={'primary'} percentage={50}></Progress>
                <br></br>
                <div className='w-[90%] m-auto'>
                    <Table
                        headerRow={[
                            <TableHeaderCell key={1} className='text-white'>header1</TableHeaderCell>,
                            <TableHeaderCell key={2} className='text-white'>header2</TableHeaderCell>
                        ]}
                        bodyRows={[
                            <TableBodyRow
                                key={1}
                                row={[
                                    <TableDataCell key='1' value={''}>Something</TableDataCell>,
                                    <TableDataCell key='2' value={''}>Something</TableDataCell>,
                                ]}
                                rowIndex={0}/>,
                            <TableBodyRow
                                key={2}
                                row={[
                                    <TableDataCell key='1' value={''}>Something</TableDataCell>,
                                    <TableDataCell key='2' value={''}>Something</TableDataCell>,
                                ]}
                                rowIndex={1}/>
                        ]}/>
                </div>
                <br></br>
                <TextArea className='w-96 h-44'>TextArea</TextArea>
                <br></br>
                <Toggle name={''}></Toggle>
            </main>
        </>
    );
}
