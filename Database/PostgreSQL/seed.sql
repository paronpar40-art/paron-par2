-- ========================================================
-- Armored and Logistics Unit Management System
-- Initial Seed Data
-- ========================================================

INSERT INTO soldiers (id, military_number, rank, full_name, unit_company, platoon, status, role, phone_number)
VALUES 
    ('a0000000-0000-0000-0000-000000000001', 'MIL-10294', 'نقيب', 'احمد علي المحمود', 'السرية الأولى مدرعات', 'الفصيل الأول', 'PRESENT', 'COMMANDER', '+966500000001'),
    ('a0000000-0000-0000-0000-000000000002', 'MIL-20481', 'ملازم أول', 'خالد حسن السلمي', 'السرية الثانية إمداد', 'الفصيل الثاني', 'DUTY_OFFICER', 'SUPERVISOR', '+966500000002'),
    ('a0000000-0000-0000-0000-000000000003', 'MIL-30912', 'رقيب أول', 'عمر فاروق العتيبي', 'سرية القيادة والسيطرة', 'فصيل الإشارة', 'LEAVE', 'SOLDIER', '+966500000003')
ON CONFLICT (military_number) DO NOTHING;

INSERT INTO armored_vehicles (vehicle_code, vehicle_type, model, readiness_status, fuel_level, ammo_status)
VALUES 
    ('ARM-T90-01', 'دبابة قتال رئيسية T-90', '2024', 'OPERATIONAL', 95, 'FULL'),
    ('ARM-APC-04', 'ناقلة جند مدرعة M113', '2023', 'OPERATIONAL', 88, 'FULL'),
    ('LOG-TRK-12', 'شاحنة دعم إمدادي آلي', '2022', 'MAINTENANCE', 45, 'NONE')
ON CONFLICT (vehicle_code) DO NOTHING;
