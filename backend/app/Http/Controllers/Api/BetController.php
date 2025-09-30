<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Bet;
use App\Models\BetSelection;
use Illuminate\Support\Facades\DB;


class BetController extends Controller
{
    use \Illuminate\Foundation\Auth\Access\AuthorizesRequests;
    public function index(Request $request)
    {
        return $request->user()
                       ->bets()
                       ->with('selections')
                       ->latest()
                       ->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'type' => 'required|in:simple,combinada',
            'description' => 'nullable|string',
            'stake' => 'required|numeric',
            'odd' => 'required_if:type,simple|numeric',
            'selections' => 'required_if:type,combinada|array',
            'selections.*.event_name' => 'required_if:type,combinada|string',
            'selections.*.market' => 'required_if:type,combinada|string',
            'selections.*.pick' => 'required_if:type,combinada|string',
            'selections.*.odd' => 'required_if:type,combinada|numeric',
        ]);

        return DB::transaction(function () use ($request, $data) {
            if ($data['type'] === 'simple') {
                $odd = $data['odd'];
            } else {
                // Calcular cuota total multiplicando las cuotas de cada selección
                $odd = collect($data['selections'])->pluck('odd')->reduce(fn($carry,$item)=>$carry*$item,1);
            }

            $bet = Bet::create([
                'user_id' => $request->user()->id,
                'type' => $data['type'],
                'description' => $data['description'] ?? '',
                'stake' => $data['stake'],
                'odd' => $odd,
                'potential_win' => $data['stake'] * $odd,
            ]);

            if ($data['type'] === 'combinada') {
                foreach ($data['selections'] as $sel) {
                    BetSelection::create([
                        'bet_id' => $bet->id,
                        'event_name' => $sel['event_name'],
                        'market' => $sel['market'],
                        'pick' => $sel['pick'],
                        'odd' => $sel['odd'],
                    ]);
                }
            }

            return $bet->load('selections');
        });
    }

    public function show(Bet $bet)
    {
        $this->authorize('view', $bet);
        return $bet->load('selections');
    }

    public function update(Request $request, Bet $bet)
    {
        $this->authorize('update', $bet);
        $bet->update($request->only('status'));
        return $bet->load('selections');
    }

    public function destroy(Bet $bet)
    {
        $this->authorize('delete', $bet);
        $bet->delete();
        return response()->json(['message' => 'Apuesta eliminada']);
    }

    public function guardar($monto)
    {
        // Aquí puedes usar $monto directamente
        $bet = Bet::create([
            'user_id' => auth()->id(),
            'stake'   => $monto,
            'type'    => 'simple',
            'odd'     => 1.8,
            'potential_win' => $monto * 1.8
        ]);

        return response()->json(['message' => 'Guardado', 'bet' => $bet]);
    }

}
