import React from 'react';
import { Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';

import { Container, Form, Input, SubmitButton } from './styles';

const Main = () => {

    const [newUser, setNewUser] = React.useState('');
    const [users, setUsers] = React.useState([]);

    handleAddUser = async () => {
        const response = await api.get(`/users/${newUser}`);
        const data = {
            name: response.data.name,
            login: response.data.login,
            bio: response.data.bio,
            avatar: response.data.avatar_url,
        }

        setUsers(...users, data)
        setNewUser('')

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
        </Container >
    )
};

export default Main;
