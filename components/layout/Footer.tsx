"use client";

import Link from "next/link";
import { Linkedin, Mail, MapPin, Instagram, Phone } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { InfoModal } from "@/components/ui/InfoModal";

// Helper for GitHub Pages prefix
                            <Image
                                src="/sinflow-logo.jpg"
                                alt="SinFlow Logo"
                                width={48}
                                height={48}
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            <span className="text-2xl font-bold text-white tracking-tighter">SinFlow</span>
                        </Link >
                        <p className="text-sm mb-6">
                            Transformamos empresas mediante inteligencia artificial, datos y automatización avanzada.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-sinflow-secondary transition-colors">
                                <span className="sr-only">LinkedIn</span>
                                <Linkedin className="h-6 w-6" />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-sinflow-secondary transition-colors">
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
                                <span>300 505 1518</span>
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
            <p>&copy; {new Date().getFullYear()} SinFlow. Todos los derechos reservados.</p>
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
