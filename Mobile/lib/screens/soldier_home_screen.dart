import 'package:flutter/material.dart';

class SoldierHomeScreen extends StatefulWidget {
  const SoldierHomeScreen({super.key});

  @override
  State<SoldierHomeScreen> createState() => _SoldierHomeScreenState();
}

class _SoldierHomeScreenState extends State<SoldierHomeScreen> {
  bool _isPresentConfirmed = true;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('منظومة المقاتل الميداني'),
        actions: [
          IconButton(
            icon: const Icon(Icons.notifications_active_outlined),
            onPressed: () {},
          )
        ],
      ),
      body: Directionality(
        textDirection: TextDirection.rtl,
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Card profile
              Card(
                color: const Color(0xFF0F172A),
                elevation: 4,
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Row(
                    children: [
                      const CircleAvatar(
                        radius: 28,
                        backgroundColor: Color(0xFF0D9488),
                        child: Icon(Icons.person, color: Colors.white, size: 32),
                      ),
                      const SizedBox(width: 16),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: const [
                          Text('عريف / محمد عبد الله الزهراني', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                          SizedBox(height: 4),
                          Text('الرقم العسكري: MIL-88410', style: TextStyle(color: Colors.grey)),
                          Text('الكتيبة الثانية - السرية الأولى مدرعات', style: TextStyle(color: Colors.tealAccent, fontSize: 12)),
                        ],
                      )
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 20),
              // Attendance Status
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: _isPresentConfirmed ? Colors.emerald.withOpacity(0.15) : Colors.amber.withOpacity(0.15),
                  border: Border.all(color: _isPresentConfirmed ? Colors.emerald : Colors.amber),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Column(
                  children: [
                    Text(
                      _isPresentConfirmed ? 'تم تأكيد التمام اليومي بنجاح' : 'لم يتم تسجيل التمام اليومي بعد',
                      style: TextStyle(fontWeight: FontWeight.bold, color: _isPresentConfirmed ? Colors.emeraldAccent : Colors.amberAccent),
                    ),
                    const SizedBox(height: 12),
                    ElevatedButton.icon(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: _isPresentConfirmed ? Colors.emerald : Colors.amber,
                        foregroundColor: Colors.white,
                      ),
                      icon: Icon(_isPresentConfirmed ? Icons.check_circle : Icons.send),
                      label: Text(_isPresentConfirmed ? 'تأكيد التمام (موجود)' : 'إرسال نداء التمام الان'),
                      onPressed: () {
                        setState(() {
                          _isPresentConfirmed = !_isPresentConfirmed;
                        });
                      },
                    )
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
