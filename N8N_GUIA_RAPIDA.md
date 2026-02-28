# Guía de Instalación Rápida: Bot SynFlow IA en n8n

Acabo de crear un archivo en la raíz de tu proyecto llamado `n8n_whatsapp_flow.json`. Es toda la solución que diseñamos ya lista y preconfigurada. Sigue estos pasos para activarla en n8n:

## 1. Importar el Flujo
1. Abre tu panel de control de n8n.
2. Crea un nuevo Workflow.
3. Arriba a la derecha, haz clic en el engranaje de Opciones de Workflow y selecciona **"Import from File"** o si prefieres, abre  `n8n_whatsapp_flow.json` con un bloc de notas, copia todo su contenido y simplemente pégalo con `Ctrl + V` en el lienzo vacío de n8n.
4. Verás aparecer 5 nodos: _Webhook, Agente IA, Modelo Gemini, Window Memory y WhatsApp API_.

## 2. Configurar Credenciales
Los nodos mostrarán iconos de advertencia porque necesitan permisos.
1. **Doble clic en el nodo "Google Gemini Model":**
   - En *Credential to connect with*, selecciona o crea unas nuevas credenciales de `Google Gemini API` y pega tu `GOOGLE_API_KEY`.
2. **Doble clic en el nodo "Respuesta WhatsApp API":**
   - En *Credential to connect with*, configura tus credenciales de la API de *Meta / WhatsApp Cloud API* proporcionando tu **Proccess Token**.
   - En el campo `Phone Number ID`, reemplaza el texto marcador `SUSTITUIR_POR_TU_PHONE_NUMBER_ID_DE_META` por el ID numérico de tu perfil en Facebook Developers.

## 3. Conectar Webhook de Meta a n8n
1. Haz doble clic en el primer nodo **"Webhook (WhatsApp Entrante)"**.
2. Arriba verás las `"Webhook URLs"`. Selecciona la pestaña **Test** o **Production** y copia esa URL.
3. Entra a tu aplicación en **Meta for Developers -> WhatsApp -> Configuration**.
4. En la sección "Webhook", pega esa URL que recibiste de n8n e indica que te suscribirás al campo `messages`.

## 4. Probar Inteligencia
- Haz clic abajo en n8n donde dice **"Test Workflow"**
- Envía un mensaje desde cualquier cuenta de WhatsApp al número de tu empresa configurado.
- El trigger se activará, pasará el mensaje al nodo "Agente IA (SynFlow)", Gemini leerá el Custom Prompt (que ya dejé configurado en español con tus prioridades de ventas), redactará la respuesta y el último nodo la enviará de regreso al usuario.

¡Activa tu workflow moviendo la palanca superior a *Active* cuando la prueba te guste y tendrás un consultor gratuito operando 24/7 para tu Landing Page!
