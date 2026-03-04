import 'package:flutter/material.dart';

import 'utilities/shorebird.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Shorebird Template',
      theme: ThemeData(colorScheme: .fromSeed(seedColor: Colors.deepOrange)),
      home: const MyHomePage(title: 'Shorebird Template'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;
  late final ShorebirdService _shorebirdService;

  @override
  void initState() {
    super.initState();
    _shorebirdService = ShorebirdService();
  }

  @override
  void dispose() {
    _shorebirdService.dispose();
    super.dispose();
  }

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: .center,
          children: [
            ValueListenableBuilder(
              valueListenable: _shorebirdService.isUpdateReady,
              builder: (context, ready, child) {
                if (ready) {
                  return Card(
                    color: Theme.of(context).colorScheme.primaryContainer,
                    margin: const EdgeInsets.symmetric(horizontal: 16),
                    child: Padding(
                      padding: const EdgeInsets.all(16),
                      child: Row(
                        children: [
                          const Expanded(child: Text("A new update is ready!")),
                          TextButton(
                            onPressed: () => _shorebirdService.restart(),
                            child: const Text("RESTART NOW"),
                          ),
                        ],
                      ),
                    ),
                  );
                }

                return ValueListenableBuilder<int>(
                  valueListenable: _shorebirdService.version,
                  builder: (context, version, child) {
                    return Text(
                      "App is up to date\nPatch version: $version",
                      textAlign: TextAlign.center,
                    );
                  },
                );
              },
            ),
            const SizedBox(height: 16),
            TextButton.icon(
              onPressed: () => _shorebirdService.checkForUpdates(),
              icon: const Icon(Icons.refresh),
              label: const Text("Check for updates"),
            ),
            const SizedBox(height: 40),
            const Text(
              "You can push a new patch to test hotfixes without redeploying!\nThis is Patch 4",
              textAlign: TextAlign.center,
            ),
            const Text("A sample Flutter app to test Shorebird's hotfix capabilities."),
            const SizedBox(height: 40),
            const Text('You have pushed the button this many times:'),
            Text('Count: $_counter', style: Theme.of(context).textTheme.headlineLarge),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: const Icon(Icons.add),
      ),
    );
  }
}
