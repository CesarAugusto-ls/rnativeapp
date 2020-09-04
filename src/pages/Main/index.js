import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import { ActivityIndicator, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';
import {
    Avatar,

    Bio, Container,
    Form,
    Input,

    List,


    Name,

    ProfileButton,
    ProfileButtonText, SubmitButton,

    User
} from './styles';


const Main = (props) => {

    const [newUser, setNewUser] = React.useState('');
    const [users, setUsers] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        getUsersStorage()
    }, [])

    React.useEffect(() => {
        updateStorage()
    }, [users])

    const getUsersStorage = async () => {
        const getUsers = await AsyncStorage.getItem('users')
        const usersJson = JSON.parse(getUsers)

        if (usersJson) {
            setUsers(usersJson)
        }
    }

    function updateStorage() {
        AsyncStorage.setItem('users', JSON.stringify(users))
    }

    const handleAddUser = async () => {
        if (newUser != '') {
            setLoading(true)
            const response = await api.get(`/users/${newUser}`);
            const data = {
                name: response.data.name,
                login: response.data.login,
                bio: response.data.bio,
                avatar: response.data.avatar_url,
            }

            setUsers([...users, data])
            setNewUser('')

            Keyboard.dismiss();
            setLoading(false)
        }
    }

    const handleNavigate = (user) => {
        const { navigation } = props

        navigation.navigate('User', { user });
    }


    return (
        <Container >
            <Form>
                <Input
                    autoCorrect={false}
                    autoCaptalize="none"
                    placeholder="Adicionar usuário"
                    value={newUser}
                    onChangeText={text => setNewUser(text)}
                    returnKeyType="send"
                    onSubmitEditing={handleAddUser}
                />
                <SubmitButton loading={loading} onPress={handleAddUser}>
                    {loading ?
                        <ActivityIndicator color="#FFF" />
                        :
                        <Icon name="add" size={20} color="#fff" />
                    }

                </SubmitButton>
            </Form>
            <List
                data={users}
                keyExtractor={(user, index) => `${user.login} ${index}`}
                renderItem={({ item }) => {
                    return (
                        <User>
                            <Avatar source={{ uri: item.avatar }} />
                            <Name>{item.name}</Name>
                            <Bio>{item.bio}</Bio>

                            <ProfileButton onPress={() => handleNavigate(item)}>
                                <ProfileButtonText>Ver perfil</ProfileButtonText>
                            </ProfileButton>
                        </User>
                    )
                }}
            />
        </Container >
    )
};

export default Main;
