const User = require('../db/models/user');

const getUsers = async (req,res) => {
  try {
    const id = req.params.id
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'No se encontro el usuario' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el usuario', error: error.message });
  }
};

const getAllUser = async (req,res) => {
  try {
    const users = await User.find()
      .select('nickName email followers following -_id' )
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}


const createUser = async (req, res) => {
  try {
    const { nickName, email } = req.body;
    const newUser = new User({
      nickName,
      email,
      followers: [],
      following: []
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el usuario', error: error.message });
  }
};

const updateNickName = async (req, res) => {
  try {
    const { nickName } = req.body;
    if (!nickName) {
      return res.status(400).json({ message: 'Falta el campo nickname' });
    }
    const userActualizado = await User.findByIdAndUpdate(
      req.params.id,
      { nickName }, 
      { new: true, runValidators: true } 
    );
    if (!userActualizado) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(userActualizado);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el nickname', error: error.message });
  }
};

const updateEmail = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Falta el campo nickname' });
    }
    const userActualizado = await User.findByIdAndUpdate(
      req.params.id,
      { email }, 
      { new: true, runValidators: true } 
    );
    if (!userActualizado) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(userActualizado);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el email', error: error.message });
  }
};

const deleteUser = async (req, res) =>{
  try {
    const idABuscar = await req.params.id;
    await User.deleteMany({ user: idABuscar })
    const userEliminado = await User.findByIdAndDelete(idABuscar);
    if (!userEliminado) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json({ message: 'Usuario eliminado con éxito' });
  }
  catch (error) {
    res.status(500).json({ message: 'Error al eliminar el usuario', error: error.message });
  }
}


const followUser = async (req, res) => {
  try {
    const { id, idASeguir } = req.params;
    if (id === idASeguir) {
      return res.status(400).json({ error: "No puedes seguirte a ti mismo" });
    }
    const user = await User.findById(id);
    const userASeguir = await User.findById(idASeguir);
    if (!user || !userASeguir) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    if (user.following.includes(userASeguir._id)) {
      return res.status(400).json({ error: "Ya sigues a este usuario" });
    }
    user.following.push(userASeguir._id);
    userASeguir.followers.push(user._id);
    await user.save();
    await userASeguir.save();
    res.status(201).json({ message: `${user.nickName} siguió de forma exitosa a: ${userASeguir.nickName}` });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor", details: error.message });
  }
};



module.exports = {getUsers, createUser, updateNickName, updateEmail, deleteUser,followUser, getAllUser};