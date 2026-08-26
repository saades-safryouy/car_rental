@extends('layouts.admin')

@section('title', 'Client Activities')

@section('content')
<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Page Header -->
    <div class="mb-6">
        <h1 class="text-2xl font-bold text-gray-900">Client Activities</h1>
        <p class="mt-1 text-sm text-gray-600">View and manage client rental history and activities</p>
    </div>
    
    <!-- Stats Overview -->
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
                <dt class="text-sm font-medium text-gray-500 truncate">Total Clients</dt>
                <dd class="mt-1 text-3xl font-semibold text-gray-900">{{ $clients->count() }}</dd>
            </div>
        </div>
        
        <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
                <dt class="text-sm font-medium text-gray-500 truncate">Active Rentals</dt>
                <dd class="mt-1 text-3xl font-semibold text-indigo-600">{{ $clients->sum(function($client) { return $client->locations->where('statut', '!=', 'completed')->count(); }) }}</dd>
            </div>
        </div>
        
        <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
                <dt class="text-sm font-medium text-gray-500 truncate">Completed Rentals</dt>
                <dd class="mt-1 text-3xl font-semibold text-green-600">{{ $clients->sum(function($client) { return $client->locations->where('statut', 'completed')->count(); }) }}</dd>
            </div>
        </div>
        
        <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
                <dt class="text-sm font-medium text-gray-500 truncate">New Clients (30 days)</dt>
                <dd class="mt-1 text-3xl font-semibold text-gray-900">{{ $clients->where('created_at', '>=', now()->subDays(30))->count() }}</dd>
            </div>
        </div>
    </div>

    <!-- Search and Filter -->
    <div class="bg-white shadow rounded-lg mb-6">
        <div class="px-4 py-5 sm:p-6">
            <div class="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0 sm:space-x-4">
                <div class="w-full sm:w-64">
                    <label for="search" class="sr-only">Search clients</label>
                    <div class="relative rounded-md shadow-sm">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        <input type="text" name="search" id="search" class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md" placeholder="Search clients">
                    </div>
                </div>
                
                <div class="flex flex-wrap gap-3">
                    <select id="status-filter" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                        <option value="">All Activities</option>
                        <option value="active">Active Rentals</option>
                        <option value="completed">Completed Rentals</option>
                        <option value="none">No Activity</option>
                    </select>
                    
                    <button type="button" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd" />
                        </svg>
                        Filter
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Client Activities Table -->
    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="flex items-center justify-between px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
                Client Activities Overview
            </h3>
            
            <a
             {{-- href="{{ route('clients.export') }}"  --}}
             class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <svg class="-ml-0.5 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
                Export Data
            </a>
        </div>

        <div class="flex flex-col">
            <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div class="overflow-hidden">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Client Name
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Contact Info
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Total Rentals
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Latest Activity
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200" id="client-table-body">
                                @foreach($clients as $client)
                                <tr class="hover:bg-gray-50 transition-colors duration-150">
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="flex items-center">
                                            <div class="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                                                <span class="text-indigo-700 font-medium text-sm">{{ substr($client->prenom, 0, 1) }}{{ substr($client->nom, 0, 1) }}</span>
                                            </div>
                                            <div class="ml-4">
                                                <div class="text-sm font-medium text-gray-900">
                                                    {{ $client->nom }} {{ $client->prenom }}
                                                </div>
                                                <div class="text-sm text-gray-500">
                                                    ID: {{ $client->id_client }}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="flex flex-col">
                                            <div class="flex items-center text-sm text-gray-900">
                                                <svg class="mr-1.5 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                                </svg>
                                                {{ $client->email }}
                                            </div>
                                            <div class="flex items-center text-sm text-gray-500 mt-1">
                                                <svg class="mr-1.5 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                                </svg>
                                                {{ $client->telephone }}
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full {{ $client->locations->count() > 0 ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-800' }}">
                                            {{ $client->locations->count() }}
                                        </span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        @if($client->locations->first())
                                            <div class="flex items-center">
                                                <div class="flex-shrink-0">
                                                    <svg class="h-5 w-5 {{ $client->locations->first()->statut === 'completed' ? 'text-green-500' : 'text-yellow-500' }}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                                                    </svg>
                                                </div>
                                                <div class="ml-3">
                                                    <div class="text-sm text-gray-900">
                                                        {{ \Carbon\Carbon::parse($client->locations->first()->created_at)->format('d M Y') }}
                                                    </div>
                                                    <div class="text-sm text-gray-500">
                                                        {{ $client->locations->first()->voiture->marque->nom_marque ?? 'N/A' }}
                                                        {{ $client->locations->first()->voiture->modele ?? '' }}
                                                    </div>
                                                </div>
                                            </div>
                                        @else
                                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-gray-100 text-gray-800">
                                                No activities
                                            </span>
                                        @endif
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div class="flex justify-end space-x-3">
                                            <button onclick="toggleDetails('client-{{ $client->id_client }}')" class="text-indigo-600 hover:text-indigo-900 flex items-center">
                                                <span id="btn-text-{{ $client->id_client }}">View Details</span>
                                                <svg id="btn-icon-{{ $client->id_client }}" class="ml-1 h-5 w-5 transform transition-transform duration-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                                </svg>
                                            </button>
                                            
                                            <a 
                                            {{-- href="{{ route('clients.show', $client->id_client) }}" --}}
                                             class="text-gray-600 hover:text-gray-900">
                                                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                    <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                                                </svg>
                                            </a>
                                            
                                            <a 
                                            {{-- href="{{ route('clients.edit', $client->id_client) }}" --}}
                                             class="text-yellow-600 hover:text-yellow-900">
                                                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                </svg>
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                                <tr id="client-{{ $client->id_client }}" class="hidden">
                                    <td colspan="5" class="px-6 py-4 bg-gray-50">
                                        <div class="space-y-4">
                                            <div class="flex items-center justify-between">
                                                <h4 class="font-medium text-gray-900">Rental History</h4>
                                                <a 
                                                {{-- href="{{ route('clients.rentals', $client->id_client) }}" --}}
                                                 class="text-sm text-indigo-600 hover:text-indigo-900">View All</a>
                                            </div>
                                            
                                            @forelse($client->locations->take(3) as $location)
                                                <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                                                    <div class="flex justify-between items-start">
                                                        <div class="flex items-start space-x-4">
                                                            <div class="flex-shrink-0">
                                                                <div class="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                                                    <svg class="h-6 w-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m-6 3H4m0 0l4 4m-4-4l4-4" />
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <p class="text-sm font-medium text-gray-900">
                                                                    {{ $location->voiture->marque->nom_marque ?? 'N/A' }} 
                                                                    {{ $location->voiture->modele ?? 'N/A' }}
                                                                    <span class="text-gray-500">
                                                                        ({{ $location->voiture->immatriculation ?? 'N/A' }})
                                                                    </span>
                                                                </p>
                                                                <div class="mt-1 flex items-center text-sm text-gray-500">
                                                                    <svg class="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                                        <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                                                                    </svg>
                                                                    {{ Carbon\Carbon::parse($location->date_debut)->format('d M Y') }} - {{ Carbon\Carbon::parse($location->date_fin)->format('d M Y') }}
                                                                    <span class="mx-2">•</span> 
                                                                    {{ Carbon\Carbon::parse($location->date_debut)->diffInDays(Carbon\Carbon::parse($location->date_fin)) }} days
                                                                </div>
                                                                <div class="mt-1 flex items-center text-sm text-gray-500">
                                                                    <svg class="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                                        <path fill-rule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                                                                    </svg>
                                                                    Contract #{{ $location->id_location }}
                                                                    @if(isset($location->prix_total))
                                                                        <span class="mx-2">•</span> 
                                                                        {{ number_format($location->prix_total, 2) }} €
                                                                    @endif
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <span class="px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                            {{ $location->statut === 'completed' ? 'bg-green-100 text-green-800' : 
                                                               ($location->statut === 'active' ? 'bg-yellow-100 text-yellow-800' : 
                                                                'bg-blue-100 text-blue-800') }}">
                                                            {{ ucfirst($location->statut) }}
                                                        </span>
                                                    </div>
                                                </div>
                                            @empty
                                                <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center">
                                                    <p class="text-sm text-gray-500">No rental history available</p>
                                                    <a 
                                                    {{-- href="{{ route('locations.create', ['client_id' => $client->id_client]) }}"  --}}
                                                    class="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                        <svg class="-ml-0.5 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                                                        </svg>
                                                        Create New Rental
                                                    </a>
                                                </div>
                                            @endforelse
                                            
                                            @if($client->locations->count() > 3)
                                                <div class="text-right">
                                                    <a 
                                                    {{-- href="{{ route('clients.rentals', $client->id_client) }}"  --}}
                                                    class="text-sm text-indigo-600 hover:text-indigo-900 font-medium">
                                                        Show all {{ $client->locations->count() }} rentals →
                                                    </a>
                                                </div>
                                            @endif
                                        </div>
                                    </td>
                                </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Pagination -->
        <div class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
            <div class="flex items-center justify-between">
                <div class="flex-1 flex justify-between sm:hidden">
                    <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                        Previous
                    </a>
                    <a href="#" class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                        Next
                    </a>
                </div>
                <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                        <p class="text-sm text-gray-700">
                            Showing <span class="font-medium">1</span> to <span class="font-medium">{{ min(10, $clients->count()) }}</span> of <span class="font-medium">{{ $clients->count() }}</span> clients
                        </p>
                    </div>
                    <div>
                        <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                            <a href="#" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                <span class="sr-only">Previous</span>
                                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                                </svg>
                            </a>
                            <a href="#" aria-current="page" class="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                                1
                            </a>
                            <a href="#" class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                                2
                            </a>
                            <a href="#" class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium">
                                3
                            </a>
                            <span class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                                ...
                            </span>
                            <a href="#" class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                                10
                            </a>
                            <a href="#" class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                <span class="sr-only">Next</span>
                                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                                </svg>
                            </a>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
function toggleDetails(id) {
    const element = document.getElementById(id);
    element.classList.toggle('hidden');
    
    // Get the button icon and text elements
    const clientId = id.split('-')[1];
    const btnIcon = document.getElementById(`btn-icon-${clientId}`);
    const btnText = document.getElementById(`btn-text-${clientId}`);
    
    // Toggle icon rotation and button text
    if (element.classList.contains('hidden')) {
        btnIcon.classList.remove('rotate-180');
        btnText.textContent = 'View Details';
    } else {
        btnIcon.classList.add('rotate-180');
        btnText.textContent = 'Hide Details';
    }
}

// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search');
    const statusFilter = document.getElementById('status-filter');
    const clientRows = document.querySelectorAll('#client-table-body > tr:nth-child(odd)');
    
    function filterClients() {
        const searchTerm = searchInput.value.toLowerCase();
        const statusValue = statusFilter.value;
        
        clientRows.forEach(row => {
            const detailRow = row.nextElementSibling;
            const clientName = row.querySelector('td:first-child').textContent.toLowerCase();
            const contactInfo = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
            const totalRentals = parseInt(row.querySelector('td:nth-child(3)').textContent.trim());
            const latestActivity = row.querySelector('td:nth-child(4)').textContent.toLowerCase();
            
            // Status filter logic
            let statusMatch = true;
            if (statusValue === 'active') {
                statusMatch = latestActivity.includes('completed') === false && totalRentals > 0;
            } else if (statusValue === 'completed') {
                statusMatch = latestActivity.includes('completed');
            } else if (statusValue === 'none') {
                statusMatch = totalRentals === 0;
            }
            
            // Search term filter
            const searchMatch = clientName.includes(searchTerm) || 
                              contactInfo.includes(searchTerm) ||
                              latestActivity.includes(searchTerm);
            
            // Show/hide based on filters
            if (searchMatch && statusMatch) {
                row.classList.remove('hidden');
                
                // Keep detail row in same state (hidden or shown as before)
                if (!detailRow.classList.contains('hidden') && detailRow.id) {
                    detailRow.classList.remove('hidden');
                }
            } else {
                row.classList.add('hidden');
                if (detailRow.id) {
                    detailRow.classList.add('hidden');
                }
            }
        });
    }
    
    // Add event listeners
    if (searchInput) {
        searchInput.addEventListener('input', filterClients);
    }
    
    if (statusFilter) {
        statusFilter.addEventListener('change', filterClients);
    }
    
    // Initialize tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-toggle="tooltip"]');
    tooltipTriggerList.forEach(tooltipTriggerEl => {
        new bootstrap.Tooltip(tooltipTriggerEl);
    });
});
</script>

<!-- Export Modal -->
<div id="exportModal" class="fixed z-10 inset-0 overflow-y-auto hidden" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                    <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                        <svg class="h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                            Export Client Data
                        </h3>
                        <div class="mt-2">
                            <p class="text-sm text-gray-500">
                                Select the format and data you want to export.
                            </p>
                        </div>
                        <div class="mt-4">
                            <fieldset>
                                <legend class="text-sm font-medium text-gray-700">Format</legend>
                                <div class="mt-2 space-y-2">
                                    <div class="flex items-center">
                                        <input id="format-csv" name="format" type="radio" checked class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300">
                                        <label for="format-csv" class="ml-3 block text-sm text-gray-700">
                                            CSV
                                        </label>
                                    </div>
                                    <div class="flex items-center">
                                        <input id="format-excel" name="format" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300">
                                        <label for="format-excel" class="ml-3 block text-sm text-gray-700">
                                            Excel
                                        </label>
                                    </div>
                                    <div class="flex items-center">
                                        <input id="format-pdf" name="format" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300">
                                        <label for="format-pdf" class="ml-3 block text-sm text-gray-700">
                                            PDF
                                        </label>
                                    </div>
                                </div>
                            </fieldset>
                            <fieldset class="mt-4">
                                <legend class="text-sm font-medium text-gray-700">Data to export</legend>
                                <div class="mt-2 space-y-2">
                                    <div class="flex items-center">
                                        <input id="data-all" name="data-scope" type="radio" checked class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300">
                                        <label for="data-all" class="ml-3 block text-sm text-gray-700">
                                            All clients
                                        </label>
                                    </div>
                                    <div class="flex items-center">
                                        <input id="data-filtered" name="data-scope" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300">
                                        <label for="data-filtered" class="ml-3 block text-sm text-gray-700">
                                            Filtered results only
                                        </label>
                                    </div>
                                </div>
                            </fieldset>
                            <div class="mt-4">
                                <label for="date-range" class="block text-sm font-medium text-gray-700">Date range (optional)</label>
                                <div class="mt-1 flex space-x-3">
                                    <div>
                                        <label for="date-from" class="sr-only">From</label>
                                        <input type="date" name="date-from" id="date-from" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md">
                                    </div>
                                    <div>
                                        <label for="date-to" class="sr-only">To</label>
                                        <input type="date" name="date-to" id="date-to" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm">
                    Export
                </button>
                <button type="button" onclick="document.getElementById('exportModal').classList.add('hidden')" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                    Cancel
                </button>
            </div>
        </div>
    </div>
</div>

<!-- Client Create/Edit Quick Modal -->
<div id="clientModal" class="fixed z-10 inset-0 overflow-y-auto hidden" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                    <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                        <svg class="h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                        <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                            Quick Add Client
                        </h3>
                        <div class="mt-4">
                            <form>
                                <div class="grid grid-cols-2 gap-4">
                                    <div>
                                        <label for="firstname" class="block text-sm font-medium text-gray-700">First name</label>
                                        <input type="text" name="firstname" id="firstname" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                                    </div>
                                    <div>
                                        <label for="lastname" class="block text-sm font-medium text-gray-700">Last name</label>
                                        <input type="text" name="lastname" id="lastname" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                                    </div>
                                </div>
                                
                                <div class="mt-4">
                                    <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                                    <input type="email" name="email" id="email" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                                </div>
                                
                                <div class="mt-4">
                                    <label for="phone" class="block text-sm font-medium text-gray-700">Phone</label>
                                    <input type="tel" name="phone" id="phone" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                                </div>
                                
                                <div class="mt-4">
                                    <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
                                    <textarea name="address" id="address" rows="2" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"></textarea>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm">
                    Save Client
                </button>
                <button type="button" onclick="document.getElementById('clientModal').classList.add('hidden')" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                    Cancel
                </button>
            </div>
        </div>
    </div>
</div>
@endsection