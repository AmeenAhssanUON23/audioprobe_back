
#Asks user for the directory of files to be worked on

form Enter Full Path + \ 
    sentence directory C:\Users\ameen\Praat\
endform


#Sets up Data File - erases existing file with same name
filedelete 'directory$''name$'acoustics-log.csv
header_row$ = "Filename" + tab$ + "Jitter local" + tab$ + "Jitter local absolute"  + tab$ + "Jitter rap" + tab$ + "Jitter ppq5" + tab$ + "Jitter ddp"  + tab$ + "Shimmer local"  + tab$ + "Shimmer local dB"  + tab$ + "Shimmer apq3" + tab$ + "Shimmer apq5" + tab$ + "Shimmer apq11"  + tab$ + "Shimmer dda "  + tab$ + "Mean F0" + tab$ + "mean SD"  + tab$ + "min pitch" + tab$ + "max pitch" + tab$ + "Mean HNR" + tab$ + "SD HNR" + tab$ + "F1" +  tab$ + "F2" + tab$ + "F3"  + tab$ + "F4" + newline$
header_row$ > 'directory$'acoustics-log.csv


#Sets up array of files to run batch process on
Create Strings as file list...  list 'directory$'*.wav
  number_files = Get number of strings
  for j from 1 to number_files
     select Strings list
     current_token$ = Get string... 'j'
     name$ = current_token$ - ".wav"
     Read from file... 'directory$''current_token$'
     

#This part measures pitch with male parameters
  select Sound 'name$'
     To Pitch (ac): 0, 50, 15, "yes", 0.03, 0.45, 0.01, 0.35, 0.14, 300
     meanpitch = Get mean... 0 0 Hertz
     meansdpitch = Get standard deviation... 0 0 Hertz
     minpitch = Get minimum... 0 0 Hertz Parabolic
     maxpitch = Get maximum... 0 0 Hertz Parabolic


#This part measures jitter & shimmer
     select Sound 'name$'
     To PointProcess (periodic, cc)... 50 300
     meanlocaljitter = Get jitter (local)... 0 0 0.0001 0.02 1.3
     meanlocalabsolute = Get jitter (local, absolute)... 0 0 0.0001 0.02 1.3
     meanrap = Get jitter (rap)... 0 0 0.0001 0.02 1.3
     meanppq5 = Get jitter (ppq5)... 0 0 0.0001 0.02 1.3
     meanddp = Get jitter (ddp)... 0 0 0.0001 0.02 1.3
    select Sound 'name$'
      plus PointProcess 'name$'
      meanlocalshimmer =  Get shimmer (local)... 0 0 0.0001 0.02 1.3 1.6
      meanlocaldb = Get shimmer (local_dB)... 0 0 0.0001 0.02 1.3 1.6
     meanapq3 = Get shimmer (apq3)... 0 0 0.0001 0.02 1.3 1.6
     meanaqpq5 = Get shimmer (apq5)... 0 0 0.0001 0.02 1.3 1.6
     meanapq11 =  Get shimmer (apq11)... 0 0 0.0001 0.02 1.3 1.6
     meandda = Get shimmer (dda)... 0 0 0.0001 0.02 1.3 1.6
       

#This part measures harmoncs to noise ratio
     select Sound 'name$'
     To Harmonicity (cc)... 0.01 50 0.1 1
     meanHNR = Get mean... 0 0
     meansdHNR = Get standard deviation... 0 0
   

# This part measures formants
    select Sound 'name$'
    To Formant (burg)... 0.01 5 5000 0.025 50
    f1 =  Get mean... 1 0 0  Hertz
    f2 =  Get mean... 2 0 0 Hertz
    f3 = Get mean...  3 0 0 Hertz
    f4 = Get mean... 4 0 0 Hertz


 fileappend "'directory$'acoustics-log.csv" 'current_token$' 'tab$' 'meanlocaljitter' 'tab$' 'meanlocalabsolute' 'tab$' 'meanrap' 'tab$' 'meanppq5' 'tab$' 'meanddp' 'tab$' 'meanlocalshimmer' 'tab$' 'meanlocaldb' 'tab$' 'meanapq3' 'tab$' 'meanaqpq5' 'tab$' 'meanapq11' 'tab$' 'meandda' 'tab$' 'meanpitch' 'tab$' 'meansdpitch' 'tab$' 'minpitch' 'tab$' 'maxpitch' 'tab$' 'meanHNR' 'tab$' 'meansdHNR' 'tab$' 'f1' 'tab$' 'f2' 'tab$' 'f3' 'tab$' 'f4' 'newline$'

 select all
minus Strings list
Remove
endfor
