import React from "react";
import style from './Botao.module.scss'

interface BotaoProps {
    texto?: string;
    children?: React.ReactNode; 
}

class Botao extends React.Component<BotaoProps> {
    render() {
        const { texto, children } = this.props;
        return (
            <button className={style.botao}>
                {texto || children}
            </button>
        );
    }
}

export default Botao;
