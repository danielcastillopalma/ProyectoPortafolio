const normalizar = (texto: string): string => {
    return texto.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, '');
};

export const traducirResiduo = (tipo: string): string | undefined => {
    const claveNormalizada = normalizar(tipo);
    const mapaNormalizado: Record<string, string> = {
        pet: 'plastic',
        lata: 'can',
        vidrio: 'glass',
        electronicos: 'electronics',
        pilas: 'batteries'
    };

    return mapaNormalizado[claveNormalizada];
};