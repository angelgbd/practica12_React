import Insignia from './Insignia'

interface TarjetaPerfilProps {
  nombre: string
  carrera: string
  semestre: number
}

function TarjetaPerfil({ nombre, carrera, semestre }: TarjetaPerfilProps) {
  const iniciales = nombre
    .trim()
    .split(/\s+/)
    .map((palabra) => palabra[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <article className="tarjeta">
      <div className="tarjeta__avatar" aria-hidden="true">
        {iniciales}
      </div>
      <h2 className="tarjeta__nombre">{nombre}</h2>
      <p className="tarjeta__carrera">{carrera}</p>
      <Insignia texto={`${semestre}.º semestre`} />
      {semestre >= 7 && <Insignia texto="Por egresar" tipo="extra" />}
    </article>
  )
}

export default TarjetaPerfil
