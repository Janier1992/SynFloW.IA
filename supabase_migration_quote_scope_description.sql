-- ====================================================================
-- SYNFLOW IA — MIGRACIÓN: DESCRIPCIÓN DE ALCANCE EN COTIZACIONES
-- Ejecuta este script en el editor SQL de Supabase.
-- Es NO destructivo: agrega una columna nueva sin borrar datos existentes.
-- ====================================================================

ALTER TABLE quotes ADD COLUMN IF NOT EXISTS scope_description TEXT NOT NULL DEFAULT '';

-- ====================================================================
-- LISTO. Las cotizaciones existentes quedan con descripción vacía;
-- puedes completarla al editar cada cotización desde el portal admin.
-- ====================================================================
