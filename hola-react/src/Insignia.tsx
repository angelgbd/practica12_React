type InsigniaTipo = 'info' | 'exito' | 'extra'

interface InsigniaProps {
  texto: string
  tipo?: InsigniaTipo
}

function Insignia({ texto, tipo = 'info' }: InsigniaProps) {
  return <span className={`insignia insignia--${tipo}`}>{texto}</span>
}

export default Insignia
