import React, { Component, ChangeEvent, FormEvent } from "react";
import Botao from "../Botão";
import style from './Formulario.module.scss';

interface Petshop {
    nome: string;
    distancia: number; 
    precoCachorroPequenoDiasUteis: number;
    precoCachorroGrandeDiasUteis: number;
    precoCachorroPequenoFinaisDeSemana: number;
    precoCachorroGrandeFinaisDeSemana: number;
}

interface FormularioState {
    selectedDate: string;
    qtdCachorrosPequenos: number;
    qtdCachorrosGrandes: number;
}

class Formulario extends Component<{}, FormularioState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            selectedDate: "",
            qtdCachorrosPequenos: 0,
            qtdCachorrosGrandes: 0,
        };
    }

    handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        this.setState((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { qtdCachorrosPequenos, qtdCachorrosGrandes, selectedDate } = this.state;
        const melhorPetshop = this.encontrarPetshopMaisEconomico(qtdCachorrosPequenos, qtdCachorrosGrandes, selectedDate);
        console.log("O melhor petshop é:", melhorPetshop.nome);
        console.log("Preço total:", this.calcularPrecoTotal(melhorPetshop, qtdCachorrosPequenos, qtdCachorrosGrandes, selectedDate));
    };

    encontrarPetshopMaisEconomico(qtdCachorrosPequenos: number, qtdCachorrosGrandes: number, dataSelecionada: string): Petshop {
        const petshops: Petshop[] = [
            {
                nome: "Meu Canino Feliz",
                distancia: 2000,
                precoCachorroPequenoDiasUteis: 20,
                precoCachorroGrandeDiasUteis: 40,
                precoCachorroPequenoFinaisDeSemana: 24,
                precoCachorroGrandeFinaisDeSemana: 48
            },
            {
                nome: "Vai Rex",
                distancia: 1700,
                precoCachorroPequenoDiasUteis: 15,
                precoCachorroGrandeDiasUteis: 50,
                precoCachorroPequenoFinaisDeSemana: 20,
                precoCachorroGrandeFinaisDeSemana: 55
            },
            {
                nome: "ChowChawgas",
                distancia: 800,
                precoCachorroPequenoDiasUteis: 30,
                precoCachorroGrandeDiasUteis: 45,
                precoCachorroPequenoFinaisDeSemana: 30,
                precoCachorroGrandeFinaisDeSemana: 45, 
            }
        ];

        const diaDaSemana = new Date(dataSelecionada).getDay();
        let melhorPetshop: Petshop | null = null;
        let menorPrecoTotal = Number.MAX_SAFE_INTEGER;

        petshops.forEach(petshop => {
            let precoTotal = 0;
            if (diaDaSemana === 6 || diaDaSemana === 5) { 
                precoTotal += (petshop.precoCachorroPequenoFinaisDeSemana ?? 0) * qtdCachorrosPequenos;
                precoTotal += (petshop.precoCachorroGrandeFinaisDeSemana ?? 0) * qtdCachorrosGrandes;
            } else {
                precoTotal += (petshop.precoCachorroPequenoDiasUteis ?? 0) * qtdCachorrosPequenos;
                precoTotal += (petshop.precoCachorroGrandeDiasUteis ?? 0) * qtdCachorrosGrandes;
            }

            if (precoTotal < menorPrecoTotal || (precoTotal === menorPrecoTotal && (!melhorPetshop || petshop.distancia < melhorPetshop.distancia))) {
                melhorPetshop = petshop;
                menorPrecoTotal = precoTotal;
            }
        });

        if (!melhorPetshop) {
            throw new Error("Nenhum petshop encontrado.");
        }

        return melhorPetshop;
    }

    calcularPrecoTotal = (petshop: Petshop, qtdCachorrosPequenos: number, qtdCachorrosGrandes: number, dataSelecionada: string) => {
        const diaDaSemana = new Date(dataSelecionada).getDay();
        let precoTotal = 0;
        if (diaDaSemana === 6 || diaDaSemana === 5) { 
            precoTotal += (petshop.precoCachorroPequenoFinaisDeSemana ?? 0) * qtdCachorrosPequenos;
            precoTotal += (petshop.precoCachorroGrandeFinaisDeSemana ?? 0) * qtdCachorrosGrandes;
        } else {
            precoTotal += (petshop.precoCachorroPequenoDiasUteis ?? 0) * qtdCachorrosPequenos;
            precoTotal += (petshop.precoCachorroGrandeDiasUteis ?? 0) * qtdCachorrosGrandes;
        }
        return precoTotal;
    };

    


    render() {
        const { selectedDate, qtdCachorrosPequenos, qtdCachorrosGrandes } = this.state;

        return (
            <main className={style.container}>
                <h1>A melhor escolha para o Senhor Eduardo</h1>
                <form className={style.novaTarefa} onSubmit={this.handleSubmit}>
                    <div className={style.inputContainer}>
                        <label htmlFor="cachorosPequenos" className={style.labelTexto}>
                            Quantidade de cachorros pequenos
                        </label>
                        <input type="number" name="qtdCachorrosPequenos" id="cachorrosPequenos" placeholder="Quantidade de cachorros pequenos" value={qtdCachorrosPequenos} onChange={this.handleChange} required/>
                    </div>

                    <div className={style.inputContainer}>
                        <label htmlFor="cachorrosGrandes" className={style.labelTexto}>
                            Quantidade de cachorros grandes
                        </label>
                        <input type="number" name="qtdCachorrosGrandes" id="cachorrosGrandes" placeholder="Quantidade de cachorros grandes" value={qtdCachorrosGrandes} onChange={this.handleChange} required />
                    </div>

                    <div className={style.inputContainer}>
                        <h2 className={style.labelTexto}>Selecione uma data:</h2>
                        <input type="date" name="selectedDate" value={selectedDate} onChange={this.handleChange} required/>
                        <p className={style.dataTexto}>Data selecionada: {selectedDate}</p>
                    </div>

                    <Botao texto="Pesquisar"></Botao>
                </form>
            </main>
        );
    }
}

export default Formulario;
