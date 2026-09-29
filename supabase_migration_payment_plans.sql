-- ====================================================================
-- SYNFLOW IA — MIGRACIÓN: PLANES DE PAGO DIFERIDO EN COTIZACIONES
-- Ejecuta este script en el editor SQL de Supabase.
-- Es NO destructivo: agrega columnas nuevas sin borrar datos existentes.
-- ====================================================================

ALTER TABLE quotes ADD COLUMN IF NOT EXISTS payment_type TEXT NOT NULL DEFAULT 'unico';
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS installments INTEGER NOT NULL DEFAULT 1;
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS down_payment NUMERIC NOT NULL DEFAULT 0;
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS installment_amount NUMERIC NOT NULL DEFAULT 0;

-- Restricciones de integridad (se agregan por separado para que el script
-- no falle si ya existen en una re-ejecución)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'quotes_payment_type_check'
    ) THEN
        ALTER TABLE quotes ADD CONSTRAINT quotes_payment_type_check
            CHECK (payment_type IN ('unico', 'diferido'));
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'quotes_installments_check'
    ) THEN
        ALTER TABLE quotes ADD CONSTRAINT quotes_installments_check
            CHECK (installments >= 1);
    END IF;
END $$;

-- ====================================================================
-- LISTO. Las cotizaciones existentes quedan como 'unico' (pago único)
-- por defecto, sin pérdida de información.
-- ====================================================================
