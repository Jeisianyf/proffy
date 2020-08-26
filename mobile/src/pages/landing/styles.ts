import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8257E5',
        justifyContent: 'center',
        padding: 40
    },

    banner: {
        width: '100%',
        resizeMode: 'contain',
        marginTop: 40
    },

    title: {
        fontFamily: 'Poppins_400Regular',
        color: '#FFF',
        fontSize: 20,
        lineHeight: 30,
        marginTop: 58
    },

    titleBold: {
        fontFamily: 'Poppins_700Bold'
    },

    buttonsContainer: {
        flexDirection: 'row',
        marginTop: 34,
        justifyContent: 'space-between'
    },

    button: {
        height: 140,
        width: '48%',
        borderRadius: 8,
        padding: 24,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },

    buttonPrimary: {
        backgroundColor: '#9871f5'
    },

    buttonSecondary: {
        backgroundColor: '#04D361'
    },

    buttonText: {
        fontFamily: 'Archivo_700Bold',
        color: '#FFF',
        fontSize: 20
    },

    totalConnections: {
        fontFamily: 'Poppins_400Regular',
        color: '#d4c2ff',
        fontSize: 12,
        lineHeight: 20,
        maxWidth: 140,
        marginTop: 34
    }
});

export default styles;