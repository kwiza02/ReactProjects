//Utils

export default class Utils {

    static isStringNull = (text) => {
        if (text === '' || text === null || text === '[]') {
            return true;
        }
        else {
            return false;
        }
    }

    static isEmailValid = (text) => {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            return false;
        } else {
            return true;
        }
    }

    static isNameValid = (text) => {
        const regn = /^[a-zA-Z\s]+$/;
        if (regn.test(text) === false) {
            return false;
        } else {
            return true;
        }
    }

    static isPassValid = (text) => {
        const regx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if (regx.test(text) === false) {
            return false;
        } else {
            return true;
        }
    }

    static isPassSmall = (text) => {
        const regx = /^(?=.*[a-z])/;

        if (regx.test(text) === false) {
            return false;
        } else {
            return true;
        }
    }


    static isPassCapital = (text) => {
        const regx = /^(?=.*[A-Z])/;

        if (regx.test(text) === false) {
            return false;
        } else {
            return true;
        }
    }

    static isPassNumber = (text) => {
        const regx = /^(?=.*[0-9])/;

        if (regx.test(text) === false) {
            return false;
        } else {
            return true;
        }
    }

    static isPassSpecial = (text) => {
        const regx = /^(?=.*[!@#$%^&])/;

        if (regx.test(text) === false) {
            return false;
        } else {
            return true;
        }
    }

    static ispassLength = (text) => {
        const regl = /^(?=.{8,})/;

        if (regl.test(text) === false) {
            return false;
        } else {
            return true;
        }
    }

}
