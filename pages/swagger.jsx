import { createSwaggerSpec } from 'next-swagger-doc'
import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'

const Swagger = ({ spec }) => {
    return (
        <SwaggerUI spec={spec} />
    )
}

export const getStaticProps = () => {
    return {
        props: {
            spec: createSwaggerSpec({
                title: 'MongoDB and React Next.js Swagger',
                version: '1.0.0',
                apiFolder: 'pages/api'
            })
        },
    }
}

export default Swagger
