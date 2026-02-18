import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {
    const [nome, setNome] = useState('');
    const [acompanhantes, setAcompanhantes] = useState('0');
    const [presente, setPresente] = useState('');
    const [listaOcupada, setListaOcupada] = useState<string[]>([]);
    const [tempo, setTempo] = useState({d: 0, h: 0, m: 0, s: 0});
    const [carregando, setCarregando] = useState(false);

    const categorias = {
        "🍳 Cozinha": ["Jogo de talheres", "Jogo de facas", "Lixeira (Inox,Bambu)", "Jogo de copos", "Jogo de copos sobremesas", "Conjunto de taças", "Jogo de panelas", "Jogo de pratos", "Batedeira", "Jogo de xícaras", "Cafeteira", "Sanduicheira", "Escorredor de louças", "Utilitários de silicone", "Formas", "Pano de prato", "Potes", "Jarra de vidro", "Porta alimentos de Bambu", "Jogo americano", "Ralador", "Travessas", "Escorredor de macarrão", "Porta frios"],
        "🛏️ Quarto": ["Jogo de cama (Casal)", "Fronha", "Edredom", "Lençol", "Cabides", "Cortinas"],
        "🚿 Banheiro": ["Toalhas (Corpo, Rosto)", "Porta escova", "Porta sabonete", "Lixeira (Inox, Bambu)", "Tapete"],
        "🛋️ Sala": ["Cortinas", "Almofadas", "Mantas", "Tapete", "Capa para Sofá"],
        "🧹 Área de Serviço": ["Balde", "Vassoura", "Rodo", "Pá d/lixo", "Pregador d/roupa", "Varal de chão"]
    };

    useEffect(() => {
        const carregarPresentes = async () => {
            try {
                const res = await fetch("https://sheetdb.io/api/v1/6eww570s2ed6h");
                const dados = await res.json();
                if (Array.isArray(dados)) setListaOcupada(dados.map((i: any) => i.presente));
            } catch (e) {
                console.error("Erro ao carregar lista");
            }
        };

        const atualizarContador = () => {
            const diff = new Date("2026-09-12T13:00:00").getTime() - new Date().getTime();
            if (diff > 0) {
                setTempo({
                    d: Math.floor(diff / 86400000),
                    h: Math.floor((diff % 86400000) / 3600000),
                    m: Math.floor((diff % 3600000) / 60000),
                    s: Math.floor((diff % 60000) / 1000)
                });
            }
        };

        carregarPresentes();
        const interval = setInterval(atualizarContador, 1000);
        return () => clearInterval(interval);
    }, []);

    const confirmar = async () => {
        if (!nome.trim() || !presente) {
            alert("Por favor, preencha seu nome e escolha um presente! 🎁");
            return;
        }

        setCarregando(true);
        try {
            const res = await fetch("https://sheetdb.io/api/v1/6eww570s2ed6h", {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    data: [{
                        nome,
                        acompanhantes: acompanhantes === '0' ? 'Apenas eu' : `+ ${acompanhantes} pessoas`,
                        presente,
                        confirmado: 'SIM',
                        data_registro: new Date().toLocaleString()
                    }]
                })
            });

            if (res.ok) {
                alert("Sua presença foi confirmada com sucesso! ❤️");
                window.location.reload();
            }
        } catch (e) {
            alert("Erro de conexão. Tente novamente.");
        } finally {
            setCarregando(false);
        }
    };

    return (
        <div className="container">
            <h2 className="data-topo">12 • SETEMBRO • 2026</h2>
            <p style={{opacity: 0.8, fontWeight: 300}}>Sábado, às 13:00h</p>

            <a href="https://www.google.com/maps/search/?api=1&query=R.+Oldemar+de+Souza,+23+-+Jóquei+Clube,+São+Gonçalo"
               target="_blank" rel="noreferrer" className="btn-mapa">
                📍 Ver Localização
            </a>

            <div className="contador-row">
                {Object.entries(tempo).map(([key, val]) => (
                    <div className="tempo-unidade" key={key}>
                        <span>{val}</span>
                        <label>{key === 'd' ? 'Dias' : key === 'h' ? 'Hrs' : key === 'm' ? 'Min' : 'Seg'}</label>
                    </div>
                ))}
            </div>

            <div className="card-main">
                <p style={{fontSize: '0.65rem', color: '#b2bec3', fontWeight: 600, letterSpacing: '2px'}}>CHÁ DE PANELA
                    & NOIVADO</p>
                <h1>Camilly & Lucas</h1>
                <div className="linha"></div>

                <div className="form-group">
                    <label>Nome do Convidado</label>
                    <input placeholder="Ex: João Silva" value={nome} onChange={e => setNome(e.target.value)}/>

                    <label>Acompanhantes</label>
                    <select value={acompanhantes} onChange={e => setAcompanhantes(e.target.value)}>
                        <option value="0">Vou sozinho(a)</option>
                        {[1, 2, 3, 4, 5, 6, 7].map(n => <option key={n}
                                                                value={n}>+ {n} {n === 1 ? 'pessoa' : 'pessoas'}</option>)}
                    </select>

                    <label>Escolha um Presente</label>
                    <select value={presente} onChange={e => setPresente(e.target.value)}>
                        <option value="">Clique para selecionar...</option>
                        {Object.entries(categorias).map(([cat, itens]) => (
                            <optgroup label={cat} key={cat}>
                                {itens.filter(p => !listaOcupada.includes(p)).map(p => (
                                    <option key={p} value={p}>{p}</option>
                                ))}
                            </optgroup>
                        ))}
                    </select>

                    <button className="btn-enviar" onClick={confirmar} disabled={carregando}>
                        {carregando ? "Confirmando..." : "Confirmar Presença"}
                    </button>
                </div>
            </div>

            {/* CORAÇÃO ADICIONADO ABAIXO */}
            <p style={{marginTop: '30px', fontSize: '0.9rem', opacity: 0.7, color: 'white'}}>
                Esperamos por você! ❤️
            </p>
        </div>
    );
}