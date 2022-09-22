const useGenre = (selectedGenres) => {
    if (selectedGenres.length < 1) return "";
  
    const GenreIds = selectedGenres.map((g) => g.id);
    return GenreIds.reduce((acc, id) => acc + "," + id);
  };
  
  export default useGenre;