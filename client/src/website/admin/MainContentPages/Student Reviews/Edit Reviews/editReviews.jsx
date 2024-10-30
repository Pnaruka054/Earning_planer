import './editReviews.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'

function EditReviews() {
    const { index } = useParams()
    const [editProfileName, setEditProfileName] = useState('');
    const [editExprience, setEditExprience] = useState('');
    const [editProfileImage, setEditProfileImage] = useState(null);
    const [getdata1, setGetdata1] = useState(null)

    useEffect(() => {
        const Database = async () => {
            try {
                let FirstDataGet = await axios.get(`${import.meta.env.VITE_SERVER_URL}/FooterGet`)
                setGetdata1(FirstDataGet.data)
            } catch (error) {
                console.log(error)
            }
        }
        Database()
    }, [])

    function adminButtonClicked(event) {
        event.target.classList.add('adminButtonClicked')
    }

    function adminButtonUp(event) {
        event.target.classList.remove('adminButtonClicked')
    }

    function editProfiletNameF(event) {
        setEditProfileName(event.target.value)
    }

    function editExprienceF(event) {
        setEditExprience(event.target.value)
    }

    function editProfileLogo1F(event) {
        setEditProfileImage(event.target.files[0])
    }

    let loading = document.querySelector('.editAddProjectLoadingDiv')
    let PostDataBase = async (AllData) => {
        try {
            let ProfileImageLink = getdata1[index].Image
            let ProfileImageArray = ProfileImageLink.split('/')
            let ProfileImage = ProfileImageArray[ProfileImageArray.length - 1].split('.')[0]

            let ObjID = getdata1[index]._id
            await axios.patch(`${import.meta.env.VITE_SERVER_URL}/patchEditFooter/${ObjID}?ProfileLogo=${ProfileImage}`, AllData)
            loading.className = 'editAddProjectLoadingDiv'
        } catch (error) {
            console.log(error)
        }
    }

    function FooterSubmited(event) {
        event.preventDefault();

        if (editProfileName !== '' || editExprience !== '' || editProfileImage !== null) {
            const formData = new FormData();

            if (editProfileName !== undefined) {
                formData.append('Name', editProfileName);
            }
            if (editExprience !== undefined) {
                formData.append('Exprience', editExprience);
            }
            if (editProfileImage !== undefined) {
                formData.append('Image', editProfileImage);
            }
            PostDataBase(formData);
            setEditProfileName('')
            setEditExprience('')
            document.getElementById('editProfileLogoInputF').value = null;

            loading.className = 'editAddProjectLoading'
        } else {
            alert('Please Fill This Form')
        }
    };
    const navigate = useNavigate();
    function handleExitButtonClick() {
        navigate('/admin');
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
        <div className='editAddProjectRelative'>
            <div className='editAddProjectLoadingDiv'>
                <i className="fa-duotone fa-spinner-third fa-spin"></i>
            </div>
            <button className='ExitButton' onClick={handleExitButtonClick}><i className="fa-solid fa-left-to-bracket"></i> Exit</button>
            <div className='editAddProjectsDiv'>
                <form>
                    <legend className='FooterLegend'>Admin Form (Projects Information)</legend>
                    <table>
                        <tbody>
                            <tr className='FooterEnterName'>
                                <td>
                                    <p></p>
                                    <label className='FooterEditTitle'>Enter Profile Name - </label>
                                </td>
                                <td>
                                    <p style={{ marginBottom: '0', color: 'red', fontSize: '13px' }}>* Required</p>
                                    <input id='projectNameF' type='text' value={editProfileName} onChange={editProfiletNameF} />
                                </td>
                            </tr>
                            <tr className='FooterEnterExprience'>
                                <td>
                                    <p></p>
                                    <label>Enter Exprience - </label>
                                </td>
                                <td>
                                    <p style={{ marginBottom: '0', color: 'red', fontSize: '13px' }}>* Required</p>
                                    <input type='text' value={editExprience} onChange={editExprienceF} />
                                </td>
                            </tr>
                            <tr className='FooterUpload'>
                                <td><label>Upload Profile Logo - </label></td>
                                <td>
                                    <p style={{ marginBottom: '0', color: 'red', fontSize: '13px' }}>* Required</p>
                                    <input id='editProfileLogoInputF' type='file' accept="image/*" onChange={editProfileLogo1F} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='adminButtonFirst'>
                        <button id='FooterAdminBTN1' className='adminBTN1' type='submit' onMouseDown={adminButtonClicked} onMouseUp={adminButtonUp} onClick={FooterSubmited} >Submit</button>
                        <button id='FooterAdminBTN2' className='adminBTN2' type='reset' onMouseDown={adminButtonClicked} onMouseUp={adminButtonUp} >Reset</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditReviews
