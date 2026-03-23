-- Insert default app for existing and new deployments.
-- Devices with app_id = null are considered unscoped (global).
INSERT INTO "apps" ("id", "name", "slug", "created_at")
VALUES ('default', 'Default App', 'default', now())
ON CONFLICT (id) DO NOTHING;
