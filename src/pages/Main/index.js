import React from 'react';
import { Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';

import {
    Container,
    Form,
    Input,
    SubmitButton,
    List,
    User,
    Avatar,
    Name,
    Bio,
    ProfileButton,
    ProfileButtonText,
} from './styles';

const Main = () => {

    const [newUser, setNewUser] = React.useState('');
    const [users, setUsers] = React.useState([]);

    const handleAddUser = async () => {
        const response = await api.get(`/users/${newUser}`);
        const data = {
            name: response.data.name,
            login: response.data.login,
            bio: response.data.bio,
            avatar: response.data.avatar_url,
        }

        setUsers([...users, data])
        setNewUser('')

        console.tron.log(users)

        Keyboard.dismiss();
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
                <SubmitButton onPress={handleAddUser}>
                    <Icon name="add" size={20} color="#fff" />
                </SubmitButton>
            </Form>
            <List
                data={users}
                keyExtractor={user => user.login}
                renderItem={({ item }) => {
                    return (
                        <User>
                            <Avatar source={{ uri: item.avatar }} />
                            <Name>{item.name}</Name>
                            <Bio>{item.bio}</Bio>

                            <ProfileButton onPress={() => { }}>
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
