# CMakeLists.txt
# Date: 2015-06-04
# Author: Karsten Ahnert (karsten.ahnert@gmx.de)
#
# Distributed under the Boost Software License, Version 1.0.
# (See accompanying file LICENSE_1_0.txt or
# copy at http://www.boost.org/LICENSE_1_0.txt)
#


project ( gpcxx_viz_gp )

cmake_minimum_required ( VERSION 2.8.12 )

find_package ( Boost REQUIRED )

set ( CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++14" )        ## Optimize

include_directories ( ${Boost_INCLUDE_DIRS} )
include_directories ( ../third_party/gpcxx/include )
include_directories ( ../third_party/gpcxx/performance/benchmarks )

add_executable ( visualization visualization.cpp )

