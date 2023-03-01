import React, { useState } from 'react'


function Contacto() {
    const [sent, setSent] = useState(false)
    const [touched, setTouched] = useState({})
    const [input, setInput] = useState({
        nombre: "",
        email: "",
        tel: "",
        asunto: "",
        mensaje: ""
    })
    const [errors, setErrors] = useState({})
    
    const sendContactForm = async (data) => 
    fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    })


    function validate(input) {
        let errors = {};
        if(!input.nombre) {
            errors.nombre = "Campo Requerido"
        }
        if(!input.email) {
            errors.email = "Campo Requerido"
        }
        if(!input.tel) {
            errors.tel = "Campo Requerido"
        }
        if(!input.asunto) {
            errors.asunto = "Campo Requerido"
        }
        if(!input.mensaje) {
            errors.mensaje = "Campo Requerido"
        }
        return errors;
      };



    const handleOnBlur = ({ target }) => setTouched((input) => ({
        ...input, 
        [target.name]: true
    }))
    const handleInputChange = ({ target }) => {
        setInput({
            ...input,
            [target.name]: target.value
        })
        setErrors(validate({
            ...input,
            [target.name]: target.value
        }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await sendContactForm(input)
            setTouched({})
            setInput({
                nombre: "",
                email: "",
                tel: "",
                asunto: "",
                mensaje: ""    
            })
            setSent(true)
        } catch (error) {
            console.warn(error.message)
        }
    }

    return (
        <div style={{ position: 'relative', marginTop: "160px", top: "100px" }}>
            <div className='center'>
                {sent ? (<h6 style={{position: "absolute", left: "360px", color: "lightgreen", textAlign: "right"}}>Message Sent ✅</h6>) : ""}
                <h6>Contactanos</h6>
                <form style={{ minHeight: "500px", maxHeight: "650px" }} onSubmit={handleSubmit}>
                    <div className="txt_field">
                        <input
                            type="text"
                            onChange={handleInputChange}
                            onBlur={handleOnBlur}
                            name="nombre"
                            value={input.nombre}
                        />
                        <span></span>
                        <label htmlFor='nombre'>Nombre</label>
                        {(errors.nombre && touched.nombre) && <p className="error-text"> {errors.nombre} </p>}
                    </div>
                    <div className="txt_field">
                        <input
                            type="email"
                            onChange={handleInputChange}
                            onBlur={handleOnBlur}
                            name="email"
                            value={input.email}
                        />
                        <span></span>
                        <label htmlFor='email'>Email</label>
                        {(errors.email && touched.email) && <p className="error-text"> {errors.email} </p>}
                    </div>
                    <div className="txt_field">
                        <input
                            type="tel"
                            onChange={handleInputChange}
                            onBlur={handleOnBlur}
                            name="tel"
                            value={input.tel}
                        />
                        <span></span>
                        <label htmlFor='tel'>Telefono</label>
                        {(errors.tel && touched.tel) && <p className="error-text"> {errors.tel} </p>}
                    </div>
                    <div className="txt_field">
                        <input
                            type="text"
                            onChange={handleInputChange}
                            onBlur={handleOnBlur}
                            name="asunto"
                            value={input.asunto}
                        />
                        <span></span>
                        <label htmlFor='asunto'>Asunto</label>
                        {(errors.asunto && touched.asunto) && <p className="error-text"> {errors.asunto} </p>}
                    </div>
                    <div className="txt_field">
                        <textarea
                            style={{ padding: "8px", height: "100px" }}
                            rows="4"
                            onChange={handleInputChange}
                            onBlur={handleOnBlur}
                            name="mensaje"
                            value={input.mensaje}
                        />
                        <span></span>
                        <label htmlFor='mensaje'>Mensaje</label>
                        {(errors.mensaje && touched.mensaje) && <p className="error-text"> {errors.mensaje} </p>}
                    </div>
                    <input type="submit" value="Enviar"
                        className={`btn-submit ${errors.nombre
                                ? true
                                : false || errors.email
                                    ? true
                                    : false || errors.tel
                                        ? true
                                        : false || errors.asunto
                                            ? true
                                            : false || errors.mensaje
                                                ? true
                                                : false == true
                                                    ? "btn-disabled"
                                                    : null
                            }`}

                    />
                </form>
            </div>
        </div>
    )
}

export default Contacto