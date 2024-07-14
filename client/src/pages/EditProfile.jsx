import { useState, useEffect, React } from 'react';
import Header from './Header';
import FriendsNavbar from './FriendsNavbar';
import './Fonts.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import FormData from 'form-data';
import { handleFileUpload } from '../utils';
import { useSelector } from 'react-redux';

export default function EditProfile() {
  const imageMimeType = /image\/(png|jpg|jpeg)/i;
  const [id, setId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [image, setImage] = useState(null);
  const [file, setFile] = useState('');
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    const fullName = user.username.split(' ');
    setFirstName(fullName[0]);
    if (fullName[1]) {
      setLastName(fullName[1]);
    }
    setBirthDate(user.birthDate);
    setGender(user.gender);
    setProfileImage(user.profileImage);
    setId(user._id);
  }, []);
  const changeHandler = (e) => {
    setFile(e.target.files[0]);
    const image = e.target.files[0];
    console.log(image);
    if (!image.type.match(imageMimeType)) {
      alert('Image mime type is not valid');
      return;
    }
    setImage(image);
  };
  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (image) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setProfileImage(result);
        }
      };
      console.log(image);
      fileReader.readAsDataURL(image);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [image]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let username = firstName + ' ' + lastName;
    let formData = new FormData();
    formData.append('profileImage', file);
    formData.append('id', id);
    formData.append('username', username);
    formData.append('birthDate', birthDate);
    formData.append('gender', gender);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Access-Control-Allow-Headers':
          'append,delete,entries,foreach,get,has,keys,set,values,Authorization',
      },
    };
    console.log(formData);
    axios
      .put('/api/user/', formData, config)
      .then((res) => {
        alert(res.data.message);
      })
      .catch((e) => {
        alert(e.response.data.message);
      });
  };
  return (
    <div>
      <header className="sticky top-0 z-30 w-full">
        <Header />
      </header>
      <section>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col bg-white rounded-md w-full  min-h-screen relative px-10 pt-10">
            {/* profile Settings */}
            <div className="flex flex-col lg:flex-row items-center w-full justify-start gap-5">
              <div className="flex flex-col justify-center items-center">
                <img
                  src={profileImage}
                  className="w-[300px] h-[300px] "
                  alt=""
                />
                <input
                  type="file"
                  name="image"
                  id="image"
                  className="ml-14"
                  onChange={changeHandler}
                />
              </div>
              <div className="flex flex-col justify-center items-center lg:items-start border-2 rounded-md border-orange-500 border-dashed py-10  mb-10 w-full ">
                <div className="flex flex-col justify-center lg:ml-32">
                  <div className="flex flex-col lg:flex-row">
                    <div className="flex flex-row items-center  mt-5 lg:mr-5">
                      <h3 className="mr-5 ">Frist Name:</h3>
                      <input
                        type="text"
                        className="w-32 text-center border border-gray-200 rounded-xl text-black p-2"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-row items-center mt-5">
                      <h3 className="mr-5">Last Name:</h3>
                      <input
                        type="text"
                        className="w-32 text-center border border-gray-200 rounded-xl text-black p-2"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex flex-row items-center mt-5">
                    <h3 className="mr-5">BirthDate:</h3>
                    <input
                      id="birthdate"
                      name="birthdate"
                      type="date"
                      value={birthDate}
                      className="block w-full  sm:w-56 rounded-md p-2  mb-2 mt-2 border focus:ring-2 focus:outline-none text-black"
                      onChange={(e) => setBirthDate(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col lg:flex-row items-center  w-full">
                    <div className="flex flex-row items-center  mt-5 lg:mr-32">
                      <h3 className="mr-5">Gender:</h3>
                      <select
                        name="gender"
                        id="gender"
                        defaultValue={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="block w-full sm:w-56 rounded-md p-2 mb-2 mt-2 border focus:ring-2 focus:outline-none text-black"
                      >
                        <option value="male" className="text-center">
                          M
                        </option>
                        <option value="female" className="text-center">
                          F
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center justify-center  mt-5 lg:mr-5 ">
              <button
                className=" bg-orange-500 text-white rounded-md px-5 py-2"
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}
