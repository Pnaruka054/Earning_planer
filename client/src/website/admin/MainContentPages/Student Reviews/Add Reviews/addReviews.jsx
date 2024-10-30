import { useEffect, useRef, useState } from 'react';
import './addReviews.css'
import axios from 'axios';
import { Link } from 'react-router-dom';

function AddReviews() {
    const [addProfileName, setAddProfileName] = useState('');
    const [addExprience, setAddExprience] = useState('');
    const [addImage, setAddImage] = useState('');

    const [getdata1, setGetdata1] = useState([])

    let loading = document.querySelector('.FooterLoadingDiv')

    let Loading = useRef()

    useEffect(() => {
        const Database = async () => {
            Loading.current.className = 'FooterLoading'
            try {
                let FirstDataGet = await axios.get(`${import.meta.env.VITE_SERVER_URL}/FooterGet`)
                Loading.current.className = 'FooterLoadingDiv'
                setGetdata1(FirstDataGet.data)
            } catch (error) {
                console.log(error)
            }
        }
        Database()
    }, [])

    const Database = async () => {
        try {
            let FirstDataGet = await axios.get(`${import.meta.env.VITE_SERVER_URL}/FooterGet`)
            setGetdata1(FirstDataGet.data)
        } catch (error) {
            console.log(error)
        }
    }
    Database()

    let FooterDeleted = async (ObjId, index) => {
        let ProfileImageLInk = getdata1[index].Image
        let ProfileImageArray = ProfileImageLInk.split('/')
        let ProfileImage = ProfileImageArray[ProfileImageArray.length - 1].split('.')[0]

        loading.className = 'FooterLoading'
        try {
            await axios.delete(`${import.meta.env.VITE_SERVER_URL}/deleteFooterAddedData/${ObjId}?ProjectImage=${ProfileImage}`)
            loading.className = 'FooterLoadingDiv'
        } catch (error) {
            console.log(error)
        }
    }

    let PostDataBase = async (AllData) => {
        try {
            await axios.post(`${import.meta.env.VITE_SERVER_URL}/postFooter`, AllData)
            loading.className = 'FooterLoadingDiv'
        } catch (error) {
            console.log(error)
        }
    }

    function adminButtonClicked(event) {
        event.target.classList.add('adminButtonClicked')
    }
    function adminButtonUp(event) {
        event.target.classList.remove('adminButtonClicked')
    }

    function addProfileNameF(event) {
        setAddProfileName(event.target.value)
    }

    function addExprienceF(event) {
        setAddExprience(event.target.value)
    }

    function addImageF(event) {
        setAddImage(event.target.files[0])
    }

    function FooterSubmited(e) {
        e.preventDefault();

        if (addProfileName === '') {
            alert('Please Enter Prifile Name')
        } else if (addExprience === '') {
            alert('Please Enter Exprience')
        } else if (addImage == null) {
            alert('Please Select Profile Image')
        } else {
            const formData = new FormData();
            formData.append('Name', addProfileName);
            formData.append('Exprience', addExprience);
            formData.append('Image', addImage);
            PostDataBase(formData);

            setAddProfileName('')
            setAddExprience('')
            document.getElementById('setAddImage').value = null;
            loading.className = 'FooterLoading'
        }
    };

    return (
        <div className='footerProject'>
            <div className='FooterLoadingDiv' ref={Loading}>
                <i className="fa-duotone fa-spinner-third fa-spin"></i>
            </div>
            <form>
                <legend>Admin Form (Footer Information)</legend>
                <table>
                    <tbody>
                        <tr className='FooterEnterName'>
                            <td><label>Enter Profile Name - </label></td>
                            <td>
                                <p style={{ marginBottom: '0', color: 'red' }}>* Required</p>
                                <input type='text' value={addProfileName} onChange={addProfileNameF} />
                            </td>
                        </tr>
                        <tr className='FooterEnterExprience'>
                            <td><label>Enter Exprience - </label></td>
                            <td>
                                <p style={{ marginBottom: '0', color: 'red' }}>* Required</p>
                                <input type='number' value={addExprience} onChange={addExprienceF} />
                            </td>
                        </tr>
                        <tr className='FooterUpload'>
                            <td><label>Upload Profile Logo - </label></td>
                            <td>
                                <p style={{ marginBottom: '0', color: 'red' }}>* Required</p>
                                <input id='setAddImage' type='file' accept="image/*" onChange={addImageF} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className='adminButtonFirst'>
                    <button id='FooterAdminBTN1' className='adminBTN1' type='submit' onMouseDown={adminButtonClicked} onMouseUp={adminButtonUp} onClick={FooterSubmited} >Submit</button>
                    <button id='FooterAdminBTN2' className='adminBTN2' type='reset' onMouseDown={adminButtonClicked} onMouseUp={adminButtonUp} >Reset</button>
                </div>
            </form>
            {
                getdata1.map((value, index) => {
                    return (
                        <div key={index} className='FooterUpdateDiv'>
                            <div className='FooterTop'>
                                <div>{index + 1}</div>
                                <div>{value.Name}</div>
                            </div>
                            <div className='FooterBottom'>
                                <button className='FooterBottomBTN' onClick={() => { FooterDeleted(value._id, index) }}>DELETE</button>
                                <div>Object id - {value._id}</div>
                                <Link to={`/admin/editFooter/${index}`}>
                                    <button className='FooterBottomBTN'>UPDATE</button>
                                </Link>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    )
}

export default AddReviews