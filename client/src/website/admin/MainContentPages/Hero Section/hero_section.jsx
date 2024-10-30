import { useEffect, useRef, useState } from 'react';
import './hero_section.css'
import axios from 'axios';

function HeroSection() {
    const [editFirstProfileName, setEditFirstProfileName] = useState('');
    const [editFirstProfileUsername, setEditFirstProfileUsername] = useState('');
    const [editFirstProjectImage, setEditFirstProjectImage] = useState(null);
    const [editFirstProjectLogo1, setEditFirstProfileLogo1] = useState(null);
    const [editFirstProjectLikes, setEditFirstProjectLikes] = useState('');
    const [editFirstProjectTitle, setEditFirstProjectTitle] = useState('');
    const [editFirstProjectDescription, setEditFirstProjectDescription] = useState('');

    const [getdata1, setGetdata1] = useState(null)

    let Loading = useRef()

    useEffect(() => {
        const Database = async () => {
            try {
                let FirstDataGet = await axios.get(`${import.meta.env.VITE_SERVER_URL}/getFirst`)
                setGetdata1(...FirstDataGet.data)
            } catch (error) {
                console.log(error)
            }
        }
        Database()
    }, [])

    let postFirstDataBase = async (formData) => {
        let ObjID = getdata1._id

        let ProjectImageLInk = getdata1.ProjectImage
        let ProjectImageArray = ProjectImageLInk.split('/')
        let ProjectImage = ProjectImageArray[ProjectImageArray.length - 1].split('.')[0]

        let ProfileLogoLink = getdata1.ProfileLogo
        let ProfileLogoArray = ProfileLogoLink.split('/')
        let ProfileLogo = ProfileLogoArray[ProfileLogoArray.length - 1].split('.')[0]

        try {
            await axios.patch(`${import.meta.env.VITE_SERVER_URL}/patch/${ObjID}?ProjectImage=${ProjectImage}&ProfileLogo=${ProfileLogo}`, formData)
            Loading.current.className = 'AddProjectLoadingDiv'
        } catch (error) {
            console.log(error)
        }
    }

    function adminFirstButtonClicked(event) {
        event.target.classList.add('adminButtonClicked')
    }

    function adminFirstButtonUp(event) {
        event.target.classList.remove('adminButtonClicked')
    }

    function handleInputChange(setterFunction) {
        return function (event) {
            setterFunction(event.target.value);
        };
    }

    function handleImageChange(setterFunction) {
        return function (event) {
            setterFunction(event.target.files[0]);
        };
    }

    function handleFormSubmit(event) {
        event.preventDefault();

        if (editFirstProfileName === '') {
            alert('Please Enter Prifile Name')
        } else if (editFirstProfileUsername === '') {
            alert('Please Enter Prifile User Name')

        } else if (editFirstProjectLogo1 == null) {
            alert('Please Select Profile Logo')
        } else if (editFirstProjectImage == null) {
            alert('Please Select Project Image')
        } else if (editFirstProjectTitle === '') {
            alert('Please Enter Project Title')
        } else if (editFirstProjectDescription === '') {
            alert('Please Enter Project Discription')
        } else {
            const formData = new FormData();
            formData.append('ProjectImage', editFirstProjectImage);
            formData.append('ProfileLogo', editFirstProjectLogo1);
            formData.append('Name', editFirstProfileName);
            formData.append('userName', editFirstProfileUsername);
            formData.append('likes', editFirstProjectLikes);
            formData.append('projectTitle', editFirstProjectTitle);
            formData.append('projectDiscription', editFirstProjectDescription);
            postFirstDataBase(formData);

            setEditFirstProfileName('')
            setEditFirstProfileUsername('')
            document.getElementById('editProfileLogoInput').value = null;
            document.getElementById('editProjectImageInput').value = null;
            setEditFirstProjectLikes('')
            setEditFirstProjectTitle('')
            setEditFirstProjectDescription('')

            Loading.current.className = 'FirstProjectLoading'
        }
    }

    if (!getdata1) {
        return (
            <div className='FirstProjectLoadingBefore'>
                <i className="fa-duotone fa-spinner-third fa-spin"></i>
                <div>
                    Loading
                    <i className="fa-solid fa-ellipsis fa-fade"></i>
                </div>
            </div>
        )
    }

    return (
        <div className='FirstProjectRelative'>
            <div className='FirstProjectLoadingDiv' ref={Loading}>
                <i className="fa-duotone fa-spinner-third fa-spin"></i>
            </div>
            <div className='firstProject'>
                <form>
                    <legend className='FirstProjectLegend'>Admin Form (First Project Information)</legend>
                    <table>
                        <tbody>
                            <tr className='FirstProjectEnterName'>
                                <td><label>Enter Profile Name - </label></td>
                                <td>
                                    <p style={{ marginBottom: '0', color: 'red' }}>* Required</p>
                                    <input type='text' value={editFirstProfileName} onChange={handleInputChange(setEditFirstProfileName)} required />
                                </td>
                            </tr>
                            <tr className='FirstProjectEnterUserName'>
                                <td><label>Enter Profile Username - </label></td>
                                <td>
                                    <p style={{ marginBottom: '0', color: 'red' }}>* Required</p>
                                    <input type='text' value={editFirstProfileUsername} onChange={handleInputChange(setEditFirstProfileUsername)} required />
                                </td>
                            </tr>
                            <tr className='FirstProjectEnterLikes'>
                                <td><label>Enter Profile Likes - </label></td>
                                <td>
                                    <p style={{ marginBottom: '0', color: 'green' }}>Optional</p>
                                    <input type='number' value={editFirstProjectLikes} onChange={handleInputChange(setEditFirstProjectLikes)} />
                                </td>
                            </tr>
                            <tr className='FirstProjectUpload'>
                                <td><label>Upload Profile Logo - </label></td>
                                <td>
                                    <p style={{ marginBottom: '0', color: 'red' }}>* Required</p>
                                    <input type='file' accept="image/*" id="editProfileLogoInput" onChange={handleImageChange(setEditFirstProfileLogo1)} required />
                                </td>
                            </tr>
                            <tr className='FirstProjectUpload'>
                                <td><label>Upload Project Image - </label></td>
                                <td>
                                    <p style={{ marginBottom: '0', color: 'red' }}>* Required</p>
                                    <input type='file' accept="image/*" id="editProjectImageInput" onChange={handleImageChange(setEditFirstProjectImage)} required />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
            <div className='AddProjectsDetailDiv'>
                <form>
                    <table>
                        <tbody>
                            <tr className='FirstProjectEnterTitle'>
                                <td><label>Enter Project Title</label></td>
                            </tr>
                            <tr className='ProjectDetailsTR'>
                                <td className='FirstProjectDetailsRequire'>
                                    <p style={{ marginBottom: '0', color: 'red' }}>* Required</p>
                                    <textarea className='ProjectTitleTextAria' value={editFirstProjectTitle} onChange={handleInputChange(setEditFirstProjectTitle)} required />
                                </td>
                            </tr>
                            <tr className='FirstProjectEnterDiscription'>
                                <td><label>Enter Project Description</label></td>
                            </tr>
                            <tr className='ProjectDetailsTR'>
                                <td className='FirstProjectDetailsRequire'>
                                    <p style={{ marginBottom: '0', color: 'red' }}>* Required</p>
                                    <textarea className='ProjectDiscriptionAria' value={editFirstProjectDescription} onChange={handleInputChange(setEditFirstProjectDescription)} required />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='adminButtonFirst'>
                        <button id='adminBTN1' className='adminBTN1' type='submit' onMouseDown={adminFirstButtonClicked} onMouseUp={adminFirstButtonUp} onClick={handleFormSubmit}>Submit</button>
                        <button id='adminBTN2' className='adminBTN2' type='reset' onMouseDown={adminFirstButtonClicked} onMouseUp={adminFirstButtonUp}>Reset</button>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default HeroSection;
