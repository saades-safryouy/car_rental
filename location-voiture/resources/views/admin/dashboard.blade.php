@extends('layouts.admin')

@section('title', 'Dashboard')

@section('breadcrumb', 'Dashboard')

@section('content')
<!-- Welcome Banner -->
<div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl shadow-sm p-8 mb-6 border-l-4 border-primary-500 relative overflow-hidden">
    <div class="absolute right-0 top-0 opacity-10">
        <svg width="200" height="200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 6C13.5913 6 15.1174 6.63214 16.2426 7.75736C17.3679 8.88258 18 10.4087 18 12C18 13.5913 17.3679 15.1174 16.2426 16.2426C15.1174 17.3679 13.5913 18 12 18C7 18 5 12 5 12C5 12 7 6 12 6Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    </div>
    <div class="flex flex-col md:flex-row md:items-center md:justify-between">
        <div class="mb-4 md:mb-0">
            <h2 class="text-3xl font-bold text-gray-800">Welcome back, {{ auth()->user()->name ?? 'Admin' }}!</h2>
            <p class="text-gray-600 mt-2 text-lg">Here's what's happening with your car rental business today.</p>
        </div>
        <div class="flex items-center bg-white py-3 px-6 rounded-lg shadow-sm">
            <i class="far fa-calendar-alt text-primary-500 text-xl mr-3"></i>
            <div>
                <p class="text-sm text-gray-500 font-medium">Today's Date</p>
                <p class="text-lg font-bold text-gray-800">{{ now()->format('F d, Y') }}</p>
            </div>
        </div>
    </div>
</div>

<!-- Stats Cards -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <!-- Total Reservations -->
    <div class="bg-white rounded-xl shadow-sm overflow-hidden transform transition-all duration-300 hover:shadow-md hover:-translate-y-1">
        <div class="p-6">
            <div class="flex items-center justify-between mb-4">
                <div class="bg-blue-100 p-3 rounded-xl">
                    <i class="fas fa-calendar-check text-primary-500 text-2xl"></i>
                </div>
                <span class="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center">
                    <i class="fas fa-arrow-up mr-1"></i>
                    4.6%
                </span>
            </div>
            <h3 class="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Reservations</h3>
            <div class="flex items-end gap-2 mt-1">
                <p class="text-4xl font-extrabold text-gray-800">{{ $totalReservations ?? 0 }}</p>
                <p class="text-gray-500 mb-1 text-sm">bookings</p>
            </div>
            <p class="text-gray-500 text-sm mt-2">Since last month</p>
        </div>
        <div class="bg-gradient-to-r from-primary-500 to-primary-600 h-1.5"></div>
    </div>

    <!-- Total Clients -->
    <div class="bg-white rounded-xl shadow-sm overflow-hidden transform transition-all duration-300 hover:shadow-md hover:-translate-y-1">
        <div class="p-6">
            <div class="flex items-center justify-between mb-4">
                <div class="bg-green-100 p-3 rounded-xl">
                    <i class="fas fa-users text-green-500 text-2xl"></i>
                </div>
                <span class="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center">
                    <i class="fas fa-arrow-up mr-1"></i>
                    12.8%
                </span>
            </div>
            <h3 class="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Clients</h3>
            <div class="flex items-end gap-2 mt-1">
                <p class="text-4xl font-extrabold text-gray-800">{{ $totalClients ?? 0 }}</p>
                <p class="text-gray-500 mb-1 text-sm">customers</p>
            </div>
            <p class="text-gray-500 text-sm mt-2">Since last month</p>
        </div>
        <div class="bg-gradient-to-r from-green-500 to-green-600 h-1.5"></div>
    </div>

    <!-- Total Cars -->
    <div class="bg-white rounded-xl shadow-sm overflow-hidden transform transition-all duration-300 hover:shadow-md hover:-translate-y-1">
        <div class="p-6">
            <div class="flex items-center justify-between mb-4">
                <div class="bg-purple-100 p-3 rounded-xl">
                    <i class="fas fa-car text-purple-500 text-2xl"></i>
                </div>
                <span class="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center">
                    <i class="fas fa-plus mr-1"></i>
                    3 new
                </span>
            </div>
            <h3 class="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Cars</h3>
            <div class="flex items-end gap-2 mt-1">
                <p class="text-4xl font-extrabold text-gray-800">{{ $totalCars ?? 0 }}</p>
                <p class="text-gray-500 mb-1 text-sm">vehicles</p>
            </div>
            <p class="text-gray-500 text-sm mt-2">This week</p>
        </div>
        <div class="bg-gradient-to-r from-purple-500 to-purple-600 h-1.5"></div>
    </div>

    <!-- Revenue -->
    <div class="bg-white rounded-xl shadow-sm overflow-hidden transform transition-all duration-300 hover:shadow-md hover:-translate-y-1">
        <div class="p-6">
            <div class="flex items-center justify-between mb-4">
                <div class="bg-amber-100 p-3 rounded-xl">
                    <i class="fas fa-money-bill-wave text-amber-500 text-2xl"></i>
                </div>
                <span class="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center">
                    <i class="fas fa-arrow-up mr-1"></i>
                    8.2%
                </span>
            </div>
            <h3 class="text-gray-500 text-sm font-medium uppercase tracking-wider">Revenue</h3>
            <div class="flex items-end gap-2 mt-1">
                <p class="text-4xl font-extrabold text-gray-800">

@if(isset($revenue))
    @if($revenue >= 10000)
        {{ number_format(round($revenue) / 100, 1) . 'K' }}
    @else
        {{ number_format($revenue, 0) }}
    @endif
@else
    {{ '0' }}
@endif</p>
                <p class="text-gray-500 mb-1 text-sm">USD$</p>
            </div>
            <p class="text-gray-500 text-sm mt-2">Since last month</p>
        </div>
        <div class="bg-gradient-to-r from-amber-500 to-amber-600 h-1.5"></div>
    </div>
</div>

<!-- Main Dashboard Content -->
<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <!-- Recent Activities Panel -->
    <div class="lg:col-span-2">
        <div class="bg-white rounded-xl shadow-sm overflow-hidden">
            <div class="flex items-center justify-between p-6 border-b border-gray-100">
                <div class="flex items-center">
                    <div class="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center mr-3">
                        <i class="fas fa-bell text-primary-500"></i>
                    </div>
                    <h2 class="text-xl font-bold text-gray-800">Recent Activities</h2>
                </div>
            </div>

            <!-- Search Bar -->
            <div class="flex justify-end mb-4">
                <form method="GET" action="" class="w-full max-w-xs">
                    <div class="relative">
                        <input type="text" name="search" value="{{ request('search') }}" placeholder="Search activities, client, car..." class="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:ring-primary-500 focus:border-primary-500 text-sm">
                        <span class="absolute left-3 top-2.5 text-gray-400">
                            <i class="fas fa-search"></i>
                        </span>
                    </div>
                </form>
            </div>

            <div class="divide-y divide-gray-100">
                @php
                    $filteredActivities = $recentActivities;
                    if(request('search')) {
                        $filteredActivities = $recentActivities->filter(function($activity) {
                            $search = strtolower(request('search'));
                            return (
                                (isset($activity->client->nom) && str_contains(strtolower($activity->client->nom), $search)) ||
                                (isset($activity->client->prenom) && str_contains(strtolower($activity->client->prenom), $search)) ||
                                (isset($activity->voiture->modele) && str_contains(strtolower($activity->voiture->modele), $search)) ||
                                (isset($activity->statut) && str_contains(strtolower($activity->statut), $search))
                            );
                        });
                    }
                @endphp
                @if($filteredActivities->count() > 0)
                    @foreach($filteredActivities as $activity)
                        <div class="p-5 hover:bg-primary-50/40 transition-colors rounded-lg mb-2 shadow-sm border border-gray-100 flex items-start gap-4">
                            <div class="flex-shrink-0">
                                <div class="w-12 h-12 rounded-xl flex items-center justify-center"
                                    style="background: linear-gradient(135deg, #e0e7ff 0%, #f3f4f6 100%);">
                                    <i class="fas fa-info-circle text-primary-500 text-2xl"></i>
                                </div>
                            </div>
                            <div class="flex-1">
                                <div class="flex flex-col md:flex-row md:items-center md:justify-between">
                                    <div>
                                        <span class="font-semibold text-primary-700">{{ $activity->client->nom ?? 'N/A' }}</span>
                                        <span class="mx-2 text-gray-400">rented</span>
                                        <span class="font-semibold text-purple-700">{{ $activity->voiture->modele ?? 'N/A' }}</span>
                                        <span class="mx-2 text-gray-400">-</span>
                                        <span class="inline-block px-2 py-0.5 rounded-full text-xs font-bold bg-gray-100 text-gray-700 border border-gray-200">{{ $activity->statut }}</span>
                                    </div>
                                    <div class="flex items-center mt-2 md:mt-0">
                                        <span class="text-xs text-gray-500 flex items-center">
                                            <i class="far fa-clock mr-1 text-gray-400"></i>
                                            {{ $activity->created_at ? $activity->created_at->diffForHumans() : '-' }}
                                        </span>
                                    </div>
                                </div>
                                <div class="text-xs text-gray-400 mt-1">
                                    From <span class="font-medium text-gray-600">{{ $activity->date_debut }}</span> to <span class="font-medium text-gray-600">{{ $activity->date_fin }}</span>
                                    <span class="ml-2">Total: <span class="font-semibold text-green-600">{{ number_format($activity->montant_total, 0) }} $</span></span>
                                </div>
                            </div>
                        </div>
                    @endforeach
                @else
                    <div class="p-10 text-center">
                        <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4">
                            <i class="fas fa-inbox text-gray-400 text-3xl"></i>
                        </div>
                        <p class="text-gray-500 text-lg">No recent activities found</p>
                        <p class="text-sm text-gray-400 mt-2">New activities will appear here</p>
                    </div>
                @endif
            </div>
        </div>
    </div>

    <!-- Quick Actions & Upcoming Reservations -->
    <div class="space-y-6">
        <!-- Quick Actions -->
        <div class="bg-white rounded-xl shadow-sm overflow-hidden">
            <div class="p-6 border-b border-gray-100">
                <div class="flex items-center">
                    <div class="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center mr-3">
                        <i class="fas fa-bolt text-primary-500"></i>
                    </div>
                    <h2 class="text-xl font-bold text-gray-800">Quick Actions</h2>
                </div>
            </div>
            <div class="p-6 grid grid-cols-2 gap-4">
                <a href="{{ route('voiture.create') }}" class="group flex flex-col items-center justify-center p-5 bg-gray-50 rounded-xl hover:bg-primary-50 transition-colors border border-gray-100 hover:border-primary-200">
                    <div class="w-14 h-14 rounded-xl bg-primary-100 flex items-center justify-center mb-3 group-hover:bg-primary-200 transition-colors">
                        <i class="fas fa-car-side text-primary-600 text-xl"></i>
                    </div>
                    <span class="text-sm font-bold text-gray-700 group-hover:text-primary-700">Add New Car</span>
                </a>
               
               
                <a href="{{ route('admin.analytics') }}" class="group flex flex-col items-center justify-center p-5 bg-gray-50 rounded-xl hover:bg-purple-50 transition-colors border border-gray-100 hover:border-purple-200">
                    <div class="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center mb-3 group-hover:bg-purple-200 transition-colors">
                        <i class="fas fa-chart-line text-purple-600 text-xl"></i>
                    </div>
                    <span class="text-sm font-bold text-gray-700 group-hover:text-purple-700">Reports</span>
                </a>
            </div>
        </div>
        
        <!-- Upcoming Reservations -->
        <div class="bg-white rounded-xl shadow-sm overflow-hidden">
            <div class="p-6 border-b border-gray-100">
                <div class="flex items-center">
                    <div class="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center mr-3">
                        <i class="fas fa-calendar text-primary-500"></i>
                    </div>
                    <h2 class="text-xl font-bold text-gray-800">Upcoming Reservations</h2>
                </div>
            </div>
            <div class="divide-y divide-gray-100">
                @if(isset($locations) && count($locations) > 0)
                    @foreach($locations as $reservation)
                        <div class="p-5 hover:bg-gray-50 transition-colors">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center">
                                    <div class="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center mr-4">
                                        <i class="fas fa-car-alt text-primary-500"></i>
                                    </div>
                                    <div>
                                        <p class="font-bold text-gray-800">
                                            {{ $reservation->client->name ?? 'Client Name' }}
                                        </p>
                                        <div class="flex items-center mt-1">
                                            <span class="text-sm text-gray-600 flex items-center">
                                                <i class="fas fa-car text-gray-400 mr-1"></i>
                                                {{ $reservation->car->name ?? 'Car Model' }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="bg-primary-50 py-2 px-4 rounded-lg">
                                    <p class="text-sm font-bold text-primary-700">
                                        {{ isset($reservation->start_date) ? date('M d', strtotime($reservation->start_date)) : 'Date' }}
                                    </p>
                                    <p class="text-xs text-primary-600 text-center">
                                        {{ isset($reservation->start_time) ? date('H:i', strtotime($reservation->start_time)) : 'Time' }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    @endforeach
                @else
                    <div class="p-8 text-center">
                        <div class="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gray-100 mb-4">
                            <i class="far fa-calendar-alt text-gray-400 text-2xl"></i>
                        </div>
                        <p class="text-gray-500 font-medium">No upcoming reservations</p>
                        <p class="text-sm text-gray-400 mt-2">Bookings will appear here</p>
                    </div>
                @endif
            </div>
            @if(isset($upcomingReservations) && count($upcomingReservations) > 0)
                <div class="p-4 bg-gray-50 border-t border-gray-100 text-center">
                    <a href="#" class="text-primary-600 hover:text-primary-800 text-sm font-medium inline-flex items-center">
                        View calendar 
                        <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                    </a>
                </div>
            @endif
        </div>
        
        <!-- Car Availability Summary -->
        <div class="bg-white rounded-xl shadow-sm overflow-hidden">
            <div class="p-6 border-b border-gray-100">
                <div class="flex items-center">
                    <div class="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center mr-3">
                        <i class="fas fa-check-circle text-primary-500"></i>
                    </div>
                    <h2 class="text-xl font-bold text-gray-800">Car Availability</h2>
                </div>
            </div>
            <div class="p-6">
                <div class="mb-6">
                    <div class="flex justify-between mb-2">
                        <span class="text-sm font-bold text-gray-700 flex items-center">
                            <span class="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                            Available
                        </span>
                        <span class="text-sm font-bold text-green-600">65%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-3">
                        <div class="bg-green-500 h-3 rounded-full" style="width: 65%"></div>
                    </div>
                </div>
                <div class="mb-6">
                    <div class="flex justify-between mb-2">
                        <span class="text-sm font-bold text-gray-700 flex items-center">
                            <span class="w-3 h-3 bg-primary-500 rounded-full mr-2"></span>
                            Reserved
                        </span>
                        <span class="text-sm font-bold text-primary-600">25%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-3">
                        <div class="bg-primary-500 h-3 rounded-full" style="width: 25%"></div>
                    </div>
                </div>
                <div>
                    <div class="flex justify-between mb-2">
                        <span class="text-sm font-bold text-gray-700 flex items-center">
                            <span class="w-3 h-3 bg-amber-500 rounded-full mr-2"></span>
                            Maintenance
                        </span>
                        <span class="text-sm font-bold text-amber-600">10%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-3">
                        <div class="bg-amber-500 h-3 rounded-full" style="width: 10%"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection