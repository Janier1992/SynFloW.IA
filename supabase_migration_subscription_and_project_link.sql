-- ====================================================================
-- SYNFLOW IA — MIGRACIÓN: SUSCRIPCIÓN MENSUAL + LINK DE PROYECTO
-- Ejecuta este script en el editor SQL de Supabase.
-- Es NO destructivo: agrega una columna nueva y amplía una restricción
-- existente, sin borrar datos.
-- ====================================================================

-- 1. Nueva columna para el link opcional del proyecto/prototipo
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS project_link TEXT NOT NULL DEFAULT '';

-- 2. Ampliar payment_type para admitir 'suscripcion' además de
--    'unico' y 'diferido' (se recrea la restricción porque Postgres
--    no permite agregar un valor a un CHECK existente directamente)
ALTER TABLE quotes DROP CONSTRAINT IF EXISTS quotes_payment_type_check;
ALTER TABLE quotes ADD CONSTRAINT quotes_payment_type_check
    CHECK (payment_type IN ('unico', 'diferido', 'suscripcion'));

-- ====================================================================
-- LISTO. Las cotizaciones existentes no cambian (siguen siendo
-- 'unico' o 'diferido' como estaban) y quedan con project_link vacío.
-- ====================================================================
