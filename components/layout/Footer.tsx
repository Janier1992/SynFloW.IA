"use client";

import Link from "next/link";
import { Linkedin, Mail, MapPin, Instagram, Phone } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { InfoModal } from "@/components/ui/InfoModal";

// Helper for GitHub Pages prefix
// Helper for GitHub Pages prefix (Removed)

export function Footer() {
    const [activeModal, setActiveModal] = useState<string | null>(null);

    const openModal = (type: string) => (e: React.MouseEvent) => {
        e.preventDefault();
        setActiveModal(type);
    };

    const closeModal = () => setActiveModal(null);

    const getModalContent = () => {
        switch (activeModal) {
            case 'about':
                return {
                    title: "Sobre Nosotros",
                    content: (
                        <>
                            <p className="mb-4">
                                Somos <strong>SinFlow IA IA</strong>, una agencia de soluciones tecnológicas dedicada al desarrollo de aplicaciones web y móviles, enfocada especialmente en el sector PYMES.
                            </p>
                            <p>
                                Nuestro objetivo es democratizar el acceso a la tecnología de punta, permitiendo que negocios en crecimiento puedan optimizar sus operaciones, escalar sus ventas y mejorar la experiencia de sus clientes mediante herramientas digitales personalizadas, Inteligencia Artificial y automatización.
                            </p>
                        </>
                    )
                };
            case 'privacy':
                return {
                    title: "Política de Tratamiento de Datos",
                    content: (
                        <>
                            <p className="mb-4">
                                En <strong>SinFlow IA IA</strong>, respetamos y aseguramos la privacidad de los datos personales de nuestros usuarios. Nos comprometemos a garantizar que cualquier información recopilada sea utilizada de manera responsable, transparente y segura.
                            </p>
                            <h4 className="font-bold text-white mt-4 mb-2">Principios Clave:</h4>
                            <ul className="list-disc pl-5 space-y-2 mb-4">
                                <li><strong>Transparencia:</strong> Informamos claramente sobre qué datos recolectamos y para qué.</li>
                                <li><strong>Seguridad:</strong> Implementamos medidas técnicas para proteger la información contra accesos no autorizados.</li>
                                <li><strong>Finalidad:</strong> Los datos se usan estrictamente para la prestación del servicio y comunicación con el cliente.</li>
                                <li><strong>Derechos:</strong> Los usuarios pueden solicitar la actualización, rectificación o supresión de sus datos en cualquier momento.</li>
                            </ul>
                            <p className="text-sm opacity-70">
                                Cumplimos con la normativa vigente en Colombia sobre protección de datos personales (Ley 1581 de 2012).
                            </p>
                        </>
                    )
                };
            case 'terms':
                return {
                    title: "Términos y Condiciones",
                    content: (
                        <>
                            <p className="mb-4">
                                Al acceder y utilizar los servicios de <strong>SinFlow IA IA</strong>, aceptas cumplir con los siguientes términos y condiciones de uso, los cuales rigen la relación entre la agencia y el cliente bajo las leyes de la República de Colombia.
                            </p>
                            <ul className="list-disc pl-5 space-y-2 mb-4">
                                <li><strong>Uso de la Plataforma:</strong> El usuario se compromete a usar nuestros servicios de manera lícita y ética.</li>
                                <li><strong>Propiedad Intelectual:</strong> Todo el código, diseño y contenido desarrollado por SinFlow IA IA es propiedad intelectual protegida, salvo acuerdo contrario por contrato.</li>
                                <li><strong>Modificaciones:</strong> Nos reservamos el derecho de modificar estos términos en cualquier momento notificando a los usuarios.</li>
                                <li><strong>Responsabilidad:</strong> SinFlow IA IA no se hace responsable por el uso indebido de las soluciones entregadas una vez finalizado el soporte.</li>
                            </ul>
                        </>
                    )
                };
            case 'service_dev':
                return {
                    title: "Desarrollo de Software",
                    content: (
                        <p>
                            Creamos aplicaciones web y móviles a medida, robustas y escalables. Utilizamos tecnologías modernas como Next.js, React Native y Cloud Computing para entregar productos que no solo funcionan, sino que enamoran a los usuarios.
                        </p>
                    )
                };
            case 'service_ai':
                return {
                    title: "Inteligencia Artificial",
                    content: (
                        <p>
                            Implementamos modelos de IA para analizar datos, predecir tendencias y personalizar la experiencia de usuario. Desde chatbots inteligentes hasta motores de recomendación, hacemos que tu negocio sea más inteligente.
                        </p>
                    )
                };
            case 'service_rpa':
                return {
                    title: "Automatización RPA",
                    content: (
                        <p>
                            Automatizamos tareas repetitivas y manuales para liberar el potencial humano de tu equipo. Reducimos errores operativos y aumentamos la eficiencia de tus procesos de negocio.
                        </p>
                    )
                };
            case 'service_data':
                return {
                    title: "Data & Analytics",
                    content: (
                        <p>
                            Transformamos datos brutos en información accionable. Diseñamos dashboards y sistemas de análisis que te permiten tomar decisiones estratégicas basadas en evidencia real.
                        </p>
                    )
                };
            default:
                return { title: "", content: null };
        }
    };

    const modalData = getModalContent();

    return (
        <footer className="bg-sinflow-primary border-t border-gray-800 text-gray-400">
            <InfoModal
                isOpen={!!activeModal}
                onClose={closeModal}
                title={modalData.title}
            >
                {modalData.content}
            </InfoModal>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <Image
                                src="/sinflow-logo.jpg"
                                alt="SinFlow IA Logo"
                                width={48}
                                height={48}
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            <span className="text-2xl font-bold text-white tracking-tighter">SinFlow IA IA</span>
                        </Link >
                        <p className="text-sm mb-6">
                            Transformamos empresas mediante inteligencia artificial, datos y automatización avanzada.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://www.linkedin.com/in/wbeimar-hernández-hernández-004686155" target="_blank" rel="noopener noreferrer" className="hover:text-sinflow-secondary transition-colors">
                                <span className="sr-only">LinkedIn</span>
                                <Linkedin className="h-6 w-6" />
                            </a>
                            <a href="https://www.instagram.com/plataforma_de_tecnologia?igsh=MWY5d3hqanVieWszdw==" target="_blank" rel="noopener noreferrer" className="hover:text-sinflow-secondary transition-colors">
                                <span className="sr-only">Instagram</span>
                                <Instagram className="h-6 w-6" />
                            </a>
                        </div>
                    </div >

                    <div>
                        <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Servicios</h3>
                        <ul className="space-y-3">
                            <li><button onClick={openModal('service_dev')} className="text-left hover:text-sinflow-secondary transition-colors">Desarrollo de Software</button></li>
                            <li><button onClick={openModal('service_ai')} className="text-left hover:text-sinflow-secondary transition-colors">Inteligencia Artificial</button></li>
                            <li><button onClick={openModal('service_rpa')} className="text-left hover:text-sinflow-secondary transition-colors">Automatización RPA</button></li>
                            <li><button onClick={openModal('service_data')} className="text-left hover:text-sinflow-secondary transition-colors">Data & Analytics</button></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Empresa</h3>
                        <ul className="space-y-3">
                            <li><button onClick={openModal('about')} className="text-left hover:text-sinflow-secondary transition-colors">Sobre Nosotros</button></li>
                            <li><Link href="#contacto" className="hover:text-sinflow-secondary transition-colors">Contacto</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Contacto</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-sinflow-secondary shrink-0" />
                                <span>304 476 9593</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-sinflow-secondary shrink-0" />
                                <a href="mailto:sinflow.sas.dev@gmail.com" className="hover:text-white transition-colors">sinflow.sas.dev@gmail.com</a>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-sinflow-secondary shrink-0 mt-0.5" />
                                <span>Medellín, Colombia</span>
                            </li>
                        </ul>
                    </div>
                </div >
                <div className="mt-12 pt-8 border-t border-gray-800 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-sm">
                    <div className="flex flex-col gap-1">
                        <p>&copy; {new Date().getFullYear()} SinFlow IA IA. Todos los derechos reservados.</p>
                    </div>
                    <div className="mt-4 md:mt-0 flex flex-col md:flex-row gap-4 md:space-x-6 text-center md:text-right">
                        <button onClick={openModal('privacy')} className="hover:text-white transition-colors">Política de Tratamiento de Datos</button>
                        <button onClick={openModal('terms')} className="hover:text-white transition-colors">Términos y Condiciones</button>
                    </div>
                </div>
            </div >
        </footer >
    );
}
